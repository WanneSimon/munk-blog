<template>
    <div>
      <!-- 语录 -->
      <el-row class="dlog">
        <el-col class="blank_L" :span="3"></el-col>

        <el-col class="dlog-content" :span="18">
          <SimEditor id="dl_editor" class="simEditor" v-if="$mbapi.hasPermission()"
           @onAdd="addDL" @onUpdate="updateDL" :data="editorVo"
          :showCode="false" :showOutput="false" style="min-height:40px;"
          :offset="2" :width="20"></SimEditor>
           <!-- 动态列表 -->
          <div class="log-container" v-infinite-scroll="nextPage" infinite-scroll-immediate='true'>
            <div class="log-item" v-for="item,key in dailyLogs.datas" :key="key">
              <div class="log-item-head">
                <el-row>
                  <el-col :span="6">{{item.updateTime}}</el-col>
                  <el-col :span="2" :offset="16">
                    <a href="javascript:void(0);" @click="editDL(item.id)"><i class="el-icon-edit"></i></a>
                    <el-popconfirm
                      confirmButtonText='好的'
                      cancelButtonText='不用了'
                      icon="el-icon-info"
                      iconColor="red"
                      title="确定删除吗？"
                       @onConfirm="deleteDL(item.id)"
                    >
                    <a href="javascript:void(0);" slot="reference"><i class="el-icon-delete"></i></a>
                    </el-popconfirm>
                  </el-col>
                  <el-col :span="15">{{item.tags}}</el-col>
                </el-row>
              </div>
              <div class="log-item-content ql-snow " >
                <div class="ql-editor" v-html="item.content"></div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col class="blank_R" :span="3"></el-col>
      </el-row>
    </div>
</template>

<script>
  import SimEditor from '../components/SimEditor.vue'
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: "dailyLog",
    components: { SimEditor },
    data() {
      return {
        dailyLogs: {
          datas: [],
        },
        searchVo: { // 搜索对象
          page: 0,
          size: 2,
          totalPage: 0,
          content: null,
          valid: '1'
        },

        tempVo: '',// 正在被编辑的对象
        editorVo: { content: '' }, // 编辑器中的对象
        maxId: 9, // 测试使用
      }
    },
    mounted () {
      // 滚动懒加载（用了Element的无限滚动，此方式废弃）
      // this.$nextTick(function () {
      //   var _this = this
      //   window.addEventListener('scroll',
      //     function() {
      //       if(mbapi.isLasyLoad()){
      //         _this.nextPage()
      //       }
      //     }
      //   )
      // })
    },
    created: function(){
      // this.dailyLogs.datas = [
      //   { id: 1, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
      //   { id: 2, rtime: '2020-09-15 17:28', content:"葱姜" },
      //   { id: 3, rtime: '2020-09-15 17:28', content:"欸，又加班，我想回家。" },
      //   { id: 4, rtime: '2020-09-15 17:28', content:"提丰孙宇" },
      //   { id: 5, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
      //   { id: 6, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
      //   { id: 7, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
      //   { id: 8, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
      //   { id: 9, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" }
      // ]

      var _this = this
      this.requestDLPage( 1, function(res){
        _this.searchVo.page = res.data.pageNum
        _this.searchVo.totalPage = res.data.pages
        _this.dailyLogs.datas = res.data.list
        console.log(res )
      })
    },
    methods: {
      addDL: function(data){
        console.log(data)
        const dailyLogVo =  { content: data.content, valid: '1'}
        const _this = this

        mbapi.addDailyLog(
          dailyLogVo,
          function(res){
            mbapi.info(res.info)
        })
      },

      updateDL: function(data){
        console.log("update!");
        console.log(data)

        const _this = this
        mbapi.updateDailyLog(
          {
             id: this.tempVo.id,
             content: data.content,
          }, function(res){
            mbapi.info(res.info)
            _this.editorVo = {}
            _this.tempVo = {}
          })
      },
      // 选中需要编辑的对象
      editDL: function(dailyLogId){
        this.tempVo = {}
        this.editorVo = { content: '' }

        const _this = this
        mbapi.getDailyLog({id: dailyLogId}, function(res){
          console.log('edit')
          console.log(res)
           _this.tempVo = res.data
           _this.editorVo.content = res.data.content; // 这个分号不要删，解释器好像把后面的一起识别成函数了

           (_this.$el.querySelector('#dl_editor')).scrollIntoView()
        })
      },


      deleteDL: function(id){
        mbapi.updateDailyLog(
          {
            id: id,
            valid: '0',
          }, function(res){
            mbapi.info(res.info)
          })
      },

      // 搜索页
      requestDLPage: function(page, callback){
        var requestVo = JSON.parse(JSON.stringify(this.searchVo))
        if(page > this.searchVo.totalPage) {
          requestVo.page = this.searchVo.totalPage
        } // else
        if( page <= 0 ) {
          requestVo.page = 1
        } else {
          requestVo.page = page
        }

        mbapi.searchDailyLog( requestVo, callback)
      },

      nextPage: function(){
        console.log("next page")

        // 还需要计算高度

        if( this.searchVo.page > 0
          && this.searchVo.page < this.searchVo.totalPage ){
            var _this = this
            this.requestDLPage( this.searchVo.page+1, function(res){
              _this.searchVo.page = res.data.pageNum
              _this.searchVo.totalPage = res.data.pages
              // _this.dailyLogs.datas = res.data.list

              for(var i in res.data.list){
                _this.dailyLogs.datas.push(res.data.list[i])
              }
            })
         }
      },

    }

  }
</script>

<style>
  .editor-container{
    border-radius: 6px;
    background-color: #e6dbdb;
  }

  .log-container{
    margin: 40px 0px 10px 0px;
    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */

    height:800px;
    overflow:auto;
  }
  /** 隐藏滚动条*/
  .log-container::-webkit-scrollbar {
    width: 0 !important; /* 谷歌 safari*/
  }

  .log-item{
    min-height: 80px;
    max-width: 600px;
    text-align: left;
    margin: 20px auto;
    padding: 8px 10px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 8px 18px rgba(0,0,0,.06);

  }
  .log-item-content{
    padding: 4px;
  }
</style>
