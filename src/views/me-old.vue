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

      <el-carousel :interval="5000" indicator-position="none" arrow="hover">
        <el-carousel-item class="little-wrapper" v-for="item,key in images1" :key="key">
          <!-- <h3>{{ item }}</h3> -->
          <el-image class="little-item" :fit='fit' :src="item.url" >
          </el-image>
          <span class="little_text">{{item.text}}</span>
        </el-carousel-item>
      </el-carousel>

      <!-- <div style="position:absolute; width:100%; height:10rem;"></div> -->
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

        images1: [ ],
      }
    },
    created: function() {
      this.initDiv1();
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      initDiv1: function(){
        // 设置图片
        const baseDir = "/coco/static/images/me/"
        this.images1.push({url: baseDir + "1-1.png", text: '芭芭拉的密汁饮料？芭芭拉的黑暗饮料？'})
        // this.images1.push({url:baseDir + "1-2.png", text: "可莉，淦！干！肝！"})
      },


    }
  }
</script>

<style>
  .bg-images{
    position: absolute;
    width: 90%;
    height: 60%;
    left: 5%;
    top: 1%;
    z-index: -1;
  }
  .el-carousel__container{
    height: 100% !important;
    width: 100% !important;
  }
  .wrapper{
    position: absolute;
    bottom: 1%;
    z-index: 0;
    width: 92%;
    left: 4%;
    height: 70%;
    background-color: rgba(1, 1, 1, 0.3);
  }

  .little-wrapper{
    margin-top: 10%;
    height: 86%;
    position: relative;
  }
  .little-item{
    width: 40%;
    position: relative;
    left: -15%;
    /* position: ; */
  }
  .little_text{
    position: absolute;
    color: cornsilk;
   /* top: 35%; */
    left: 60%;
    bottom: 8%;
  }
</style>
