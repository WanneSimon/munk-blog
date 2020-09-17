<template>
   <el-row class="anni-wrapper">
      <el-col class="blank_L" :span="3"></el-col>

      <el-col class="anni-body" :span="18">
        <div class="anni-top float-block">
          <SimEditor></SimEditor>
        </div>

        <el-timeline class="anni-content">
          <el-timeline-item  v-for='d,key in anniDatas' :key='key'
           :timestamp="d.anniTime" color="#0bbd87" placement="top">
            <el-card shadow="hover">

              <el-row  class="anni-node-row" :gutter="10"
                v-if='d.img && d.img!=""'>
                <el-col class="anni-node-col" :span="6">
                  <el-image :src="d.img" fit='contain'></el-image>
                </el-col>
                <el-col :span="16">
                  <p>{{d.text}}</p>
                </el-col>
              </el-row>

              <div v-if='!d.img || d.img===""'>
                <p>{{d.text}}</p>
              </div>

            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>

      <!-- <el-col class="blank_R" :span="3"></el-col> -->
   </el-row>
</template>

<script>
  import SimEditor from "../components/SimEditor.vue"

  export default {
    name: 'anniversary',
    components: { SimEditor },
    data() {
      return {
          anniDatas: []
      }
    },
    created: function() {
      this.anniDatas = [
        {id: '1', anniTime: '2020-09-13', img: '', text: '今天又是充满希望的一天。'},
        {id: '2', anniTime: '2020-09-15', img: '/coco/static/images/anni-test.gif', text: '我也是被上帝眷顾的孩子。昨天的彩票中奖啦，今天吃烧烤！'},
        {id: '3', anniTime: '2020-04-01', img: '/coco/static/images/anni-test.gif', text: '今天又是充满希望的一天。'},
        {id: '4', anniTime: '2019-12-04', img: '/coco/static/images/anni-test.gif', text: '今天是个特别的日子。小姐姐同意了！'},
        {id: '5', anniTime: '2019-10-01', img: '', text: '国庆加班，重构个项目吧！'}

      ]

    },
    methods: {

    }


  }
</script>

<style>
  .anni-top{
    height: 100px;
    width: 80%;
    min-width: 400px;
    margin: auto;
  }

  .anni-content{
    text-align: left;
    margin-top: 40px;
  }

  .anni-content .el-timeline-item__tail{
    border-color: #d8c3ec;
  }

  .anni-content .el-timeline-item__timestamp{
    color: #ff7f50;
  }
</style>
