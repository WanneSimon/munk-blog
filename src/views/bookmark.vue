<template>
   <el-row class="bookmark float-block">
     <el-col :span="1" class="blank_L"></el-col>

     <el-col :span="22">
        <el-row class="bookmark-head ">
          <el-col :span="4"> Bookmark </el-col>
          <el-col :span="20" style="text-align: right;">
            <el-input placeholder="请输入内容" style="width: 160px;" v-model="input" clearable>
            </el-input>
            <i class="el-icon-search clickable"></i>&emsp;
            <i class="el-icon-circle-plus-outline clickable"></i>
          </el-col>
        </el-row>

        <el-row class="bookmark-container ">
          <el-col :span="6"
            class="bm_left">
              左侧
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
        
      }
    },
    created: function(){

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
    min-height: 480px;
    background-color: #fefefe;
    box-shadow: 0 2px 4px rgba(0,0,0,.2);
  }

  .bm_right{
    background-color: #efefef;
  }

  .clickable:hover{
    cursor: pointer;
  }
</style>
