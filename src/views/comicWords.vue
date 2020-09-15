<template>
  <div>
    <!-- 语录 -->
    <el-row class="comics">
      <el-col class="blank_L" :span="3"></el-col>

      <el-col class="center_content" :span="18">
        <el-row>
          <el-col class="comics-item" :span="24" v-for="(c, index) in comics.datas" :key="index">
            <div>{{c.id}}.  &nbsp;<span v-html="c.content"></span></div>
          </el-col>
        </el-row>
      </el-col>

      <el-col class="blank_R" :span="3"></el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "comicWords",
    data() {
      return {
        comics: {
          datas: [
            { id: 1, content: "洗洗睡吧，梦里什么都有"  },
            { id: 2, content: '骗的就是你这种读书少的，读书多的不好骗' },
            { id: 3, content: '听我一句劝，打一架吧' },
            { id: 4, content: '睡觉吧狗命最重要' },
            { id: 5, content: '睡觉吧狗命最重要' },
            { id: 6, content: '睡觉吧狗命最重要' }
          ],
        }
      }
    },
    created: function() {

    },
    methods: {

    }

  }
</script>

<style>
  .blank_L, .blank_R {
    border-radius: 4px;
    min-height: 20px;
  }

  .comics {
    margin-top: 10px;
    min-height: 600px;
    padding: 10px 8px;
    background-color:beige
  }

  .center_content {
    background-color: #d7dee6;
    padding: 10px;
  }

  .comics-item{
    margin: 10px 0px;
    text-align: left;
  }
  .comics-item>div{
    font-size: 18px;
    background-color: #b9cbce;
    box-shadow: 0 0 1px 3px rgb(234, 236, 234);
    -webkit-box-shadow: 0 0 1px 3px rgb(234, 236, 234);
    min-height: 28px;
    margin: 10px 0px 2px 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding: 4px 6px ;
  }

  .comics .comics-item:nth-child(n) {
    color: rgb(182, 102, 28);
  }

  .comics .comics-item:nth-child(3n+1) {
    color: rgb(151, 28, 182);
  }

  .comics .comics-item:nth-child(3n+2) {
    color: rgb(28, 182, 97);
  }
</style>
