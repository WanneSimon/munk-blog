<template>
   <div>
    <!-- 废弃 -->
    <el-menu :default-active="activeIndex"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
      class="el-menu-demo" mode="horizontal" @select="handleSelect()">
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">社区</template>
        <el-menu-item index="2-1">灌水聊天</el-menu-item>
        <el-menu-item index="2-2">furry展</el-menu-item>
        <el-menu-item index="2-3">搞事情</el-menu-item>
    <!--    <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-menu-item index="3" >火爆连接</el-menu-item>
      <el-menu-item index="4"><a href="https://www.baidu.com" target="_blank">百度一下 你就知道</a></el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: 'NaviMunk',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },

    methods: {
      handleSelect: function(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
