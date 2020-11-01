<template>
  <div class="me_container">

    <el-carousel class="bg-images" :interval="5000" indicator-position="none" arrow="hover">
      <el-carousel-item v-for="item,key in carouselImages" :key="key">
        <!-- <h3>{{ item }}</h3> -->
        <el-image class="image-item" :fit='fit' :src="item" >
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <el-row class="wrapper">
      <el-col class="blank_L" :span="4"></el-col>
      <el-col :span="10">
        <el-carousel class="little-wrapper" :interval="5000"
              indicator-position="none" arrow="hover" @change="changeLittle">
          <el-carousel-item class="little-item" v-for="item,key in images1" :key="key">
            <!-- <h3>{{ item }}</h3> -->
            <el-image :fit='fit' :src="item.url" >
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>

      <el-col class="blank_L" :span="1"></el-col>
      <el-col :span="8" class="little_text">
        <span>{{rightText}}</span>
      </el-col>

      <el-col class="wrapper_bottom" :span="24">
        进来看看？
      </el-col>
    </el-row>

    <div class="me_bottom"> buttom </div>
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

        rightText: "这个人很懒，什么都没写！",
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
        this.images1.push({url:baseDir + "1-2.png", text: "可莉，淦！干！肝！"})
      },

      changeLittle: function(index){
        this.rightText = this.images1[index].text
      },

    }
  }
</script>

<style>
  .me_container{
    position: relative;
  }

  .bg-images{
    width: 100%;
    height: 30rem;
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
    width: 100%;
    height: 30rem;
    background-color: rgba(1, 1, 1, 0.3);
    position: relative;
    top: 0rem;
    margin-top: -8rem;
  }
  .little-wrapper{
    height: 23rem;
  }
  .little-item{
  }

  .little_text{
    margin-top: 10rem;
    height: 10rem;
  }
  .wrapper_bottom{
    margin-top: 1rem;
    height: 7rem;
    font-size: 1.5rem;
    font-family: "arial black";
  }

  .me_bottom{
    width: 100%;
    height: 4rem;
    background-color: rgba(1, 1, 1, 0.3);
  }
</style>
