<template>
  <div class="tree">

    <!-- 背景 -->
    <div class="bg">
      <img class="bgimage" :src="'/coco/static/images/ori2.png'">
    </div>
    
    <!-- 交互 -->
    <div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree',
  data() {
    return {
      
    }
  },
  created: function(){

  },
  destroyed: function(){

  },
  methods: {

  }
}
</script>

<style>
*{
  background-color: none;
}
.tree{
  background-color: #efefef;
  padding: 10px 20px;
}
.bg{
  /* background-image: url('/coco/static/images/ori2.png'); */
  width: 100%;
  height: 100%;
  z-index: -2;
}
.bgimage{
  z-index: -3;
  width: 100%;
  height: 100%;
  min-width: 800px;
  min-height: 600px;
}

</style>
