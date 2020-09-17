<template>
  <div>

    <!-- 给编辑器预留 -->
    <div class="editor-container">
      <textarea rows="6" cols="80">编辑器预留</textarea>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'SimEditor',
    data() {
      return {
        drawer: false,
        direction: 'ltr', //从右往左-rtl 从上往下-ttb 从下往上btt
        head_img: '/coco/static/images/t1.jpg', //菜单栏顶部图片
      }
    },
    created: function(){

    },
    methods: {

    }
  };
</script>

<style>
</style>
