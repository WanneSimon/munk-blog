<template>
    <div>
      <!-- <NaviMunk></NaviMunk> -->

      <!-- 轮播 -->
      <CarouselIndex></CarouselIndex>

      <!-- 最新博文推荐 -- >
      <!-- <div class="blogs-nodes">
        <div class="node">
          <div class="node-head">
            <div class="node-head-time"></div>
            <div class="node-head-title"></div>
          </div>

          <div class="node-detail"></div>
        </div>
      </div> -->
      <div class="blogs-nodes">
        <el-row class="node"
        v-for="item,key in blogs" :key="key">
          <el-col class="node-img" :span="2" :offset="2">
            <el-image
                  style="width: 100px; height: 100px"
                  :src="item.url"
                  :fit="fit">
             </el-image>
          </el-col>
          <el-col class="" :span="15" :offset="2">
            <el-row class="node-content" >
              <el-col class="node-head-time" :span="4">{{item.time}}</el-col>
              <el-col class="node-head-title" :span="16">{{item.title}}</el-col>
              <el-col class="node-detail" :span="24">{{item.content}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

    </div>
</template>

<script>
import NaviMunk from '../components/NaviMunk.vue'
import CarouselIndex from '../components/CarouselIndex.vue'

export default {
  name: "index",
  components: { NaviMunk, CarouselIndex },
  data() {
    return {
      blogs: [],
    }
  },
  created: function() {
    for(var i=0; i<5; i++){
      this.blogs.push({
          time: '2020-09-15',
          title: '百度百科',
          url: '/coco/static/images/ori2.png',
          content: '“世界很复杂，百度更懂你”，百度百科旨在创造一个涵盖各领域知识的中文信息收集平台。百度百科强调用户的参与和奉献精神，充分调动互联网用户的力量，汇聚上亿用户的头脑智慧，积极进行交流和分享。同时，百度百科实现与百度搜索、百度知道的结合，从不同的层次上满足用户对信息的需求。'})
    }
  },
  methods: {

  }
}

</script>

<style>
.head{
  height: 60px;
}
.bottom{
  height: 80px;
}

.node{
  text-align: left;
  margin-top: 30px;
}
.node-blank{
  min-width: 10px;
 }

.node-title{
  margin: 0px 0px;
}

</style>
