<template>
   <el-row class="bookmark float-block">
     <el-col :span="1" class="blank_L"></el-col>

     <el-col :span="22">
        <el-row class="bookmark-head ">
          <el-col :span="4"> Bookmark </el-col>
          <el-col :span="20" style="text-align: right;">
            <el-input placeholder="请输入内容" style="width: 160px;" v-model="searchInput" clearable>
            </el-input>
            <i class="el-icon-search clickable"></i>&emsp;
            <!-- <i class="el-icon-circle-plus-outline clickable"></i>&emsp; -->
            <i class="el-icon-folder-add"></i>
          </el-col>
        </el-row>

        <el-row class="bookmark-container ">

          <el-col :span="6"
            class="bm_left">
              <div class="box-card_folder" shadow="hover"
                v-for="f,key in folders" :key="key"
                  @mouseover="onFolderHover(f,true)" @mouseout="onFolderHover(f,false)">
                <div class="folder_name">{{f.name}}</div>
                <div class="folder_op" v-show="testVisible(f, 'folderVisible')">
                  <i class="el-icon-circle-plus-outline clickable" style="color:#409eff"></i>
                  <i class="el-icon-remove-outline clickable" style="color:#f56c6c"></i>
                </div>
              </div>
          </el-col>

          <el-col :span="18"
            class="bm_right">
               <div class="box-card_content" shadow="hover"
                 v-for="bm,key in bookmarks" :key="key"
                  @mouseover="onBmHover(bm,true)" @mouseout="onBmHover(bm,false)">
                 <div class="bm_name"><a :href="bm.link" :target="'_blank'">{{bm.name}}</a></div>
                 <div class="bm_op" v-show="testVisible(bm,'bmVisible')">
                   <i class="el-icon-info clickable" style="color:#409eff"></i>
                   <!-- <i class="el-icon-remove-outline clickable" style="color:#f56c6c"></i> -->
                 </div>
               </div>
            </el-col>

        </el-row>
      </el-col>

      <el-col :span="1" class="blank_L"></el-col>

   </el-row>
</template>

<script>
  export default {
    name: "bookmark",
    // components: { SimEditor },
    data() {
      return {
        searchInput: '',
        folders: [],
        bookmarks: [],

        view: {
          bmVisiable: false, // 书签的编辑按钮是否可见
          folderVisiable: false, // 书签文件夹的操作按钮
        }
      }
    },
    created: function(){
      this.folders = [ {name:"学习学习学习学习学习学习学习学习学习学习学习学习学习学习"}, {name:"注释"}, {name:"网络"}, {name:"轻语"}]
      this.bookmarks = [
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"}
      ]
    },
    methods: {
      // 视图
      testVisible: function(ob, attr){
        if(!ob[attr]) {
          return false
        }
        return true
      },
      onBmHover: function (bm,isHover) {
        this.$set(bm, 'bmVisible', isHover)
        // bm.bmVisiable = isHover
        console.log(bm)
      },
      onFolderHover: function (f,isHover) {
        this.$set(f, 'folderVisible', isHover)
        // f.folderVisiable = isHover
        console.log(f)
      },
      // 功能

    }

  }
</script>

<style scoped>
  .bookmark{
    background-color: #eae8ea !important;
    min-width: 620px;
  }

  .bookmark-head{
    padding: 10px;
    color: darkgoldenrod;
    box-shadow: 0 2px 4px rgba(0,0,0,.2);
    background-color: #fefefe;
  }

  .bm_left, .bm_right{
    margin-top: 1px;
    min-height: 46rem;
    background-color: #fefefe;
    box-shadow: 0 2px 4px rgba(0,0,0,.2);
  }

  .bm_right{
    background-color: #efefef;
  }

  .clickable:hover{
    cursor: pointer;
  }


  .box-card_folder {
    padding: 0px 4px !important;
    margin: 1rem;
    height: 1.4rem;
    font-size: 1rem;
    text-align: left;
    line-height: 1.4rem;
    background-color: #f9f9f9ed;

    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
  }

  .folder_name{
    flex: 11;
    color: #4eb143;
    z-index: 0;
    overflow: hidden;  /*溢出内容隐藏*/
    white-space: nowrap;  /* 强制文本在一行内显示*/
    text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记*/
  }
  .folder_op{
    flex: 3;
    text-align: right;
    z-index: 1;
    min-width: 50px;
  }

  .box-card_content {
    padding: 2px 8px !important;
    margin: 1rem;
    height: 2.2rem;
    line-height: 2.2rem;

    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 18px rgba(0,0,0,.2);

    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
  }
  .bm_name {
    flex: 11;
    text-align: left;
    overflow: hidden;  /*溢出内容隐藏*/
    white-space: nowrap;  /* 强制文本在一行内显示*/
    text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记*/
  }
  .bm_name a{
    text-decoration: none;
    color: #bd4782;
  }
  .bm_op {
    flex: 2;
    min-width: 4rem;
  }
</style>
