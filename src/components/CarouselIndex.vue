<template>
  <!-- <el-carousel :interval="5000" arrow="always"> -->
  <el-carousel :interval="5000">
    <el-carousel-item v-for="item,key in images" :key="key">
      <!-- <h3>{{ item }}</h3> -->
      <el-image class="image-item" :fit='fit' :src="item" >
      </el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: 'CarouselIndex',
    props: {
      images: { type: Array, default(){ return []; } }
    },
    data() {
       return {
          // imageFits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
          fit: 'contain',
       }
    },
    created: function(){

    },
    methods: {

    }
  }
</script>

<style scoped>
  .image-item{
    width: 100%;
    height: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
