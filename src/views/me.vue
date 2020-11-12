<template>
  <div class="me_container" v-loading="loading">

    <el-carousel class="bg-images" v-if="!loading" :interval="5000" indicator-position="none" arrow="hover">
      <el-carousel-item v-for="item,key in carouselImages" :key="key">
        <!-- <h3>{{ item }}</h3> -->
        <el-image class="image-item" :fit='fit' :src="item" >
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <el-row class="me_content">
      <el-col class="blank_L" :lg="6" :md="4" :sm="0"></el-col>

      <el-col :lg="12" :md="16" :sm="24" style="height: 100%;">
        <div class="me_top"> 这个人很懒，什么都没写！ </div>

        <div class="me_center"> 去其他地方逛逛吧！ </div>

        <div class="me_bottom" >
  <!--        <Aplayer autoplay :music="{
              title: 'Flight Of The Silverbird',
              author: 'Two Steps From Hell、Thomas Bergersen',
              src: '/coco/static/music/Two Steps From Hell、Thomas Bergersen - Flight Of The Silverbird.mp3',
            }" :list="musicList" listFolded> -->
            <!-- 必须要设置 music 属性，所以musicList必须要有一个元素 -->
          <Aplayer autoplay :music="musicList[0]" :list="musicList"
            listFolded>
          </Aplayer>
        </div>
      </el-col>

      <el-col class="blank_R" :lg="6" :md="4" :sm="0">A</el-col>
    </el-row>

  </div>
</template>

<script>
  import CarouselIndex from '../components/CarouselIndex.vue'
  import Aplayer from 'vue-aplayer'

  // const jdata = require('/coco/static/me/me.json')

  export default {
    name: "index",
    components: {
      CarouselIndex, Aplayer
    },
    data() {
      return {
        loading: true,
        musicList: [{
          "title": "Flight Of The Silverbird",
          "artist": "Two Steps From Hell、Thomas Bergersen",
          "url": "/coco/static/music/Two Steps From Hell、Thomas Bergersen - Flight Of The Silverbird.mp3"
        }],
        carouselImages: [],
        // imageFits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        fit: 'cover',

        rightText: "这个人很懒，什么都没写！",
        images1: [ ],
      }
    },
    created: function() {
      this.readMusicList()
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      // 读取 me 的配置文件
      readMusicList: function(){
        this.loading = true
        this.$axios.get('/coco/static/me/me.json')
            .then((res)=>{
              // console.log("外部json")
              // console.log(res)
              var rd = res.data
              this.musicList = rd.musicList
              this.carouselImages = rd.carouselImages
              this.loading = false
            }).catch((res)=>{
              console.log(res)
              this.loading = false
            })
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
    position: fixed !important;
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
    position: absolute !important;
    width: 99.3%;
    height: 90%;
    top: 10%;
    /* left: 25%; */
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
    /* position: absolute; */
    bottom: 0;
    background-color: rgba(1, 1, 1, 0.3);
  }
</style>
