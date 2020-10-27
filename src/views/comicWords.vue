<template>
  <div>
    <!-- 语录 -->
    <el-row class="comics">
      <el-col class="blank_L" :span="3"></el-col>

      <el-col class="center_content" :span="18">
        <title-tag-editor id="cw_editor" class="simEditor" v-if="$mbapi.hasPermission('CW_add', 'CW_update')"
          @onAdd="addCW" @onUpdate="updateCW"
          :showCode="false" :showOutput="false" :titleName="'作者'" :data="editorVo"
          style="min-height:40px; " >
        </title-tag-editor>

        <el-row :gutter="14" class="comics-container" v-infinite-scroll="nextPage" >
          <el-col class="comics-item" :span="24"
            v-for="(c, index) in comics.datas" :key="index">
            <div class="output ql-snow " >
              <div style="text-align: right;">
                <label v-if="$mbapi.hasPermission('CW_add', 'CW_update')">
                  <a href="javascript:void(0);" @click="editCW(c.id)"><i class="el-icon-edit"></i></a>
                  <el-popconfirm
                    confirmButtonText='好的'
                    cancelButtonText='不用了'
                    icon="el-icon-info"
                    iconColor="red"
                    title="不喜欢这句了吗？"
                    @onConfirm="deleteCW(c.id)"
                  >
                  <a href="javascript:void(0);" slot="reference"><i class="el-icon-delete"></i></a>
                  </el-popconfirm>
                </label>
                <span v-else>  </span>
                [{{c.id}}]
              </div>
              <div class="ql-editor" v-html="c.text"></div>

              <div class="cw-info">
                <span>{{c.author}}</span>
              </div>

            </div>
          </el-col>
        </el-row>
      </el-col>

      <el-col class="blank_R" :span="3"></el-col>
    </el-row>

  </div>
</template>

<script>
  import SimEditor from '../components/SimEditor.vue'
  import TitleTagEditor from '../components/TitleTagEditor.vue'
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: "comicWords",
    components: { SimEditor, TitleTagEditor },
    data() {
      return {
        comics: {
          datas: []
        },
        searchVo: { // 搜索对象
          page: 0,
          size: 2,
          totalPage: 0,
          author: null,
          text: null,
          valid: '1'
        },

        tempVo: '',// 正在被编辑的对象
        editorVo: { title: '', content: '' }, // 编辑器中的对象
        maxId: 0, // 测试使用
      }
    },
    mounted () {
      // 滚动懒加载
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
    created: function() {

      var _this = this
      this.requestPage( 1, function(res){
        _this.searchVo.page = res.data.pageNum
        _this.searchVo.totalPage = res.data.pages
        _this.comics.datas = res.data.list
        // console.log(_this.comics.data )
      })

    },
    methods: {
      addCW: function(data){
        console.log("add!");
        console.log(data)
        const comicWordsVo =  {author: data.title, text: data.content, valid: '1'}
        const _this = this

        mbapi.addComicsWords(
          comicWordsVo,
          function(res){
            mbapi.info(res.info)
            // console.log(res)
        })

      },

      // 选中需要编辑的对象
      editCW: function(comicWordsId){
        this.tempVo = {}
        this.editorVo = { title: '', content: '' }

        const _this = this
        mbapi.getComicsWords({id: comicWordsId}, function(res){
          // console.log("res")
          // console.log(res)
           _this.tempVo = res.data
           _this.editorVo.title = res.data.author
           _this.editorVo.content = res.data.text; // 这个分号不要删，解释器好像把后面的一起识别成函数了
           // console.log(1)

           (_this.$el.querySelector('#cw_editor')).scrollIntoView()
           // _this.$refs.title_tag_editor.blur()
        })
      },

      updateCW: function(data){
        const _this = this
        // console.log("update")
        // console.log(data)

        mbapi.updateComicsWords(
          {
             id: this.tempVo.id,
             author: data.title,
             text: data.content,
          }, function(res){
            mbapi.info(res.info)
            _this.editorVo = {}
            _this.tempVo = {}
          })
      },

      deleteCW: function(id){
        mbapi.updateComicsWords(
          {
             id: id,
             valid: '0'
          }, function(res){
            mbapi.info(res.info)
          })
      },

      // 搜索页
      requestPage: function(page, callback){
        var requestVo = JSON.parse(JSON.stringify(this.searchVo))
        if(page > this.searchVo.totalPage) {
          requestVo.page = this.searchVo.totalPage
        } // else
        if( page <= 0 ) {
          requestVo.page = 1
        } else {
          requestVo.page = page
        }

        mbapi.searchComicsWords( requestVo, callback)

        // var _this = this
        // return new Promise ((callback, reject) => {
        //   mbapi.searchComicsWords( requestVo, (res) => {
        //     console.log("test")
        //     console.log(res)
        //     console.log(callback)
        //       if (callback) {
        //         callback(res)
        //       } else {
        //         _this.searchVo.page = res.pageNum
        //         _this.searchVo.totalPage = res.pages
        //         _this.comics.data = res.data.list
        //       }
        //   }, reject )
        // })
      },

      nextPage: function(){
        if( this.searchVo.page > 0
          && this.searchVo.page < this.searchVo.totalPage ){
            var _this = this
            this.requestPage( this.searchVo.page+1, function(res){
              _this.searchVo.page = res.data.pageNum
              _this.searchVo.totalPage = res.data.pages
              // _this.comics.datas = res.data.list

              for(var i in res.data.list){
                _this.comics.datas.push(res.data.list[i])
              }
            })
         }
      },

    }

  }
</script>


<style scoped>

  .comics {
    margin-top: 10px;
    min-height: 600px;
    padding: 10px 8px;
    background-color:beige
  }

  .comics-container{
    margin: 40px 0px 10px 0px;
    /** 隐藏滚动条*/
    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */

    height:800px;
    overflow:auto;
  }
  /** 隐藏滚动条*/
  .comics-container::-webkit-scrollbar {
    width: 0 !important; /* 谷歌 safari*/
  }

  .ql-editor{
    padding-top: 0px !important;;
    padding-bottom: 0px !important;
  }
  .cw-info{
    text-align: right;
    margin-right: 10%;
  }

  .center_content {
/*    background-color: #d7dee6; */
    background-color: #dde09d;
    padding: 10px;
  }

  .comics-item{
    margin: 10px 0px;
    text-align: left;
  }
  .comics-item>div{
    position: relative;
    font-size: 18px;
    /* background-color: #b9cbce; */
    background-color: #fcfcfc;
    box-shadow: 0 0 1px 3px rgb(234, 236, 234);
    -webkit-box-shadow: 0 0 1px 3px rgb(234, 236, 234);
    min-height: 42px;
    margin: 10px 0px 2px 0px;
    padding-top: 10px !important;
    padding-bottom: 0px;
    padding: 4px 6px ;
    border-radius: 6px;
  }

  .comics .comics-item:nth-child(n) {
    color: rgb(182, 102, 28);
  }

  .comics .comics-item:nth-child(3n+1) {
    color: rgb(151, 28, 182);
  }

  .comics .comics-item:nth-child(3n+2) {
    color: rgb(28, 182, 97);
  }

</style>
