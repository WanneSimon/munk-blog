<template>
    <el-menu-item-group :title="bookmark.title" >
      <el-menu-item index="3-1">选项1</el-menu-item>
    </el-menu-item-group>
</template>

<script>
  export default {
    name: "BookmarkFolder",
    props: { bookmarks:JSObject },
    data() {
      return {

      }
    },
    created: function(){
      this.bookmarks = [{
        name: '文件夹1',
        
      }]
    },
    methods: {

    }
  }
</script>

<style>
</style>
