<template>
    <div>
      <!-- <div class="head">  </div> -->
      <!-- 导航 -->
      <NaviMunk></NaviMunk>
      <div style="height: 10px;"></div>
      <!-- 轮播 -->
      <CarouselIndex></CarouselIndex>
      <div style="height: 40px;"></div>
      <!-- 分区 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
           <h3 class="node-title"> 灌水闲聊 </h3>
           <div class="node-desc"> 专注于各种瞎逼逼 </div>
           <div class="node-meta">11</div>

           <div class="node-plus" >
           </div>
          </div>

        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>

      <div class="bottom"></div>
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

    }
  },
  created: function() {

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

.el-row {
   margin-bottom: 20px;
   &:last-child {
     margin-bottom: 0;
   }
 }
.el-col {
  border-radius: 4px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  padding: 10px 20px 8px 20px;
  border-radius: 4px;
  height: 140px;
  text-align: left;
}
.node-title{
  margin: 0px 0px;
}
.node-desc{
  padding: 6px 0px;
  font-size: 15px;
}
.node-plus{
  background-color: #e6dcb1;
  height: 60px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
