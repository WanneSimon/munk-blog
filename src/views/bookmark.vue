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
              <div class="box-card" shadow="hover"
                v-for="f,key in folders" :key="key">
                <div class="folder_name">{{f}}</div>
                <div class="folder_op" >
                  <i class="el-icon-circle-plus-outline clickable" style="color:#409eff"></i>
                  <i class="el-icon-remove-outline clickable" style="color:#f56c6c"></i>
                </div>
              </div>
            </el-col>
          <el-col :span="18"
            class="bm_right">
              右侧
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
      }
    },
    created: function(){
      this.folders = ["学习学习学习学习学习学习学习学习学习学习学习学习学习学习", "注释", "网络", "轻语"]
      this.bookmarks = [
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"}
      ]
    },
    methods: {

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


  .box-card {
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
    color: #5a5a5a;
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
</style>
