<template>
  <div class="me_container">

    <el-carousel class="bg-images" :interval="5000" indicator-position="none" arrow="hover">
      <el-carousel-item v-for="item,key in carouselImages" :key="key">
        <!-- <h3>{{ item }}</h3> -->
        <el-image class="image-item" :fit='fit' :src="item" >
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="me_content">
      <div class="me_top"> 这个人很懒，什么都没写！ </div>

      <div class="me_center"> 去其他地方逛逛吧！ </div>

      <div class="me_bottom" >
<!--        <Aplayer autoplay :music="{
            title: 'Flight Of The Silverbird',
            author: 'Two Steps From Hell、Thomas Bergersen',
            src: '/coco/static/music/Two Steps From Hell、Thomas Bergersen - Flight Of The Silverbird.mp3',
          }" :list="musicList" listFolded> -->
        <Aplayer autoplay :music="musicList[0]" :list="musicList"
          listFolded>
        </Aplayer>
      </div>
    </div>
  </div>
</template>

<script>
  import CarouselIndex from '../components/CarouselIndex.vue'
  import Aplayer from 'vue-aplayer'

  export default {
    name: "index",
    components: {
      CarouselIndex, Aplayer
    },
    data() {
      return {
        musicList: [],
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
        this.musicList = [{
            title: 'Flight Of The Silverbird',
            artist: 'Two Steps From Hell、Thomas Bergersen',
            url: '/coco/static/music/Two Steps From Hell、Thomas Bergersen - Flight Of The Silverbird.mp3',
          },{
            title: 'Flight Of The Silverbird',
            artist: 'Two Steps From Hell、Thomas Bergersen',
            url: '/coco/static/music/Two Steps From Hell、Thomas Bergersen - Flight Of The Silverbird.mp3',
        }],

      this.initDiv1();
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      initDiv1: function(){
        // 设置图片
        // const baseDir = "/coco/static/images/me/"
        // this.images1.push({url: baseDir + "1-1.png", text: '芭芭拉的密汁饮料？芭芭拉的黑暗饮料？'})
        // this.images1.push({url:baseDir + "1-2.png", text: "可莉，淦！干！肝！"})
      },

      changeLittle: function(index){
        this.rightText = this.images1[index].text
      },

    }
  }
</script>

<style>


  .me_container{
    height: 100%;
    width: 100%;
  }

  .bg-images{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }
  .el-carousel__container{
    height: 100% !important;
    width: 100% !important;
  }
  .image-item{
    width: 100%;
    height: 100%;
  }

  .me_content{
    position: absolute;
    width: 50%;
    height: 90%;
    top: 10%;
    left: 25%;
  }
  .me_top{
    /* position: absolute; */
    height: 4rem;
    width: 100%;
    line-height: 4rem;
    font-size: 1.1rem;
    color: #9933FF;
    background-color: rgba(1, 1, 1, 0.3);
  }

  .me_center{
    height: 30rem;
    line-height: 30rem;
    font-size: 1.3rem;
    color: #7FFF00;
  }

  .me_bottom{
    width: 100%;
    position: absolute;
    bottom: 10%;
    background-color: rgba(1, 1, 1, 0.3);
  }
</style>
