<template>
    <div>
      <!-- 语录 -->
      <el-row class="dlog">
        <el-col class="blank_L" :span="3"></el-col>

        <el-col class="dlog-content" :span="18">
          <SimEditor class="simEditor" @onAdd="addHandler" @onUpdate="updateHandler"
          :showCode="false" :showOutput="false" style="min-height:40px;" 
          :offset="2" :width="20"></SimEditor>
           <!-- 动态列表 -->
          <div class="log-container">
            <div class="log-item" v-for="item,key in dailyLogs.datas" :key="key">
              <div class="log-item-head">
                <el-row>
                  <el-col :span="8">{{item.rtime}}</el-col>
                  <el-col :span="16">{{item.tags}}</el-col>
                </el-row>
              </div>
              <div class="log-item-content ql-snow " >
                <div class="ql-editor" v-html="item.content"></div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col class="blank_R" :span="3"></el-col>
      </el-row>
    </div>
</template>

<script>
  import SimEditor from '../components/SimEditor.vue'
  export default {
    name: "dailyLog",
    components: { SimEditor },
    data() {
      return {
        dailyLogs: {
          datas: [
            { id: 1, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
            { id: 2, rtime: '2020-09-15 17:28', content:"葱姜" },
            { id: 3, rtime: '2020-09-15 17:28', content:"欸，又加班，我想回家。" },
            { id: 4, rtime: '2020-09-15 17:28', content:"提丰孙宇" },
            { id: 5, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
            { id: 6, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
            { id: 7, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
            { id: 8, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" },
            { id: 9, rtime: '2020-09-15 17:28', content:"麻辣火锅羊肉串" }
          ],
        },
        maxId: 9
      }
    },
    created: function(){

    },
    methods: {
      addHandler: function(text){
        console.log("add!");
        console.log(text)
        this.dailyLogs.datas.push({id: this.maxId+1, rtime: '2020-09-15 17:28', content: text })
        this.maxId = this.maxId + 1
      },
      updateHandler: function(text){
        console.log("update!");
        console.log(text)
      }
    }

  }
</script>

<style>
  .editor-container{
    border-radius: 6px;
    background-color: #e6dbdb;
  }

  .log-container{
    margin: 40px 0px 10px 0px;
  }
  .log-item{
    min-height: 80px;
    max-width: 600px;
    text-align: left;
    margin: 20px auto;
    padding: 8px 10px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 8px 18px rgba(0,0,0,.06);

  }
  .log-item-content{
    padding: 4px;
  }
</style>
