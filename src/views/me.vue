<template>
  <div class="me_container">

    <el-carousel class="bg-images" :interval="5000" indicator-position="none" arrow="hover">
      <el-carousel-item v-for="item,key in carouselImages" :key="key">
        <!-- <h3>{{ item }}</h3> -->
        <el-image class="image-item" :fit='fit' :src="item" >
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="wrapper">
       <div class="div_top">
          <div class="content_item div_top1">什么什么什么</div>
          <div class="content_item div_top2">什22222222</div>
       </div>
       <div class="div_bottom">
         <div class="content_item">这又是什么什么是额是你</div>
       </div>
    </div>

  </div>
</template>

<script>
  import CarouselIndex from '../components/CarouselIndex.vue'

  export default {
    name: "index",
    components: {
      CarouselIndex
    },
    data() {
      return {
        carouselImages: [
          "/coco/static/images/ori2.png",
          "/coco/static/images/ori2.png",
        ],
        // imageFits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        fit: 'cover',
      }
    },
    created: function() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {

    }
  }
</script>

<style>
  .bg-images{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1 ;
  }
  .el-carousel__container{
    height: 100% !important;
    width: 100% !important;
  }
  .image-item{
    width: 100%;
    height: 100%;
  }

  .wrapper{
    position: fixed;
    height: 100%;
    width: 100%;
    text-align: center;
    color: orangered;
  }
  .content_item{
    background-color: rgba(255,255,255,0.4);
    position: absolute;
    top: 20%;
  }
  .div_top {
    /* background-color: coral; */
    position: relative;
    height: 60%;
    width: 70%;
    left: 20%;
    right: 10%;
  }
  .div_bottom {
    /* background-color: #0066CC; */
    position: relative;
    height: 40%;
    width: 70%;
    left: 30%;
    right: 0;
  }

  .div_top1{
    width: 50%;
  }
  .div_top2{
    width: 50%;
    right: 0;
    top: 60%;
  }
</style>
