<template>
  <div>
    <!-- 语录 -->
    <el-row class="comics">
      <el-col class="blank_L" :span="3"></el-col>

      <el-col class="center_content" :span="18">
        <!-- <SimEditor class="simEditor"  @onAdd="addHandler" @onUpdate="updateHandler"
          :showCode="false" :showOutput="false"
          style="min-height:40px; " ></SimEditor> -->
        <title-tag-editor class="simEditor"  @onAdd="addHandler" @onUpdate="updateHandler"
          :showCode="false" :showOutput="false" :titleName="'作者'"
          style="min-height:40px; " >
        </title-tag-editor>

        <el-row :gutter="14">
          <el-col class="comics-item" :span="12"
            v-for="(c, index) in comics.datas" :key="index">
            <div class="output ql-snow ">
              <div>{{c.id}}.  &nbsp;<span class="ql-editor" v-html="c.content"></span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>

      <el-col class="blank_R" :span="3"></el-col>
    </el-row>

  </div>
</template>

<script>
  import SimEditor from '../components/SimEditor.vue'
  import TitleTagEditor from '../components/TitleTagEditor.vue'
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: "comicWords",
    components: { SimEditor, TitleTagEditor },
    data() {
      return {
        comics: {
          datas: []
        },
        searchVo: { // 搜索对象

        },

        maxId: 0, // 测试使用
      }
    },
    created: function() {
      this.comics.datas = [
            { id: 1, content: "洗洗睡吧，梦里什么都有"  },
            { id: 2, content: '骗的就是你这种读书少的，读书多的不好骗' },
            { id: 3, content: '听我一句劝，打一架吧' },
            { id: 4, content: '睡觉吧狗命最重要' },
            { id: 5, content: '睡觉吧狗命最重要,睡觉吧狗命最重要,睡觉吧狗命最重要,睡觉吧狗命最重要,睡觉吧狗命最重要' },
            { id: 6, content: '睡觉吧狗命最重要' }
          ],
      this.maxId = 6

    },
    methods: {
      addHandler: function(data){
        console.log("add!");
        console.log(data)
        // this.comics.datas.push({id: this.maxId+1, content: data.content})
        // this.maxId = this.maxId + 1
        // this.$base.atest = "aatest"
        // console.log("this.$base")
        // console.log(this.$base)
        const comicWordsVo =  {author: data.title, text: data.content, valid: '1'}

        mbapi.addCommicsWords(
          comicWordsVo,
          function(res){
            this.comics.datas.unshift(res.data)
            console.log("success")
            console.log(res.data)
        })

      },
      updateHandler: function(text){
        console.log("update!");
        console.log(text)
      }
    }

  }
</script>


<style>

  .comics {
    margin-top: 10px;
    min-height: 600px;
    padding: 10px 8px;
    background-color:beige
  }

  .center_content {
/*    background-color: #d7dee6; */
    background-color: #dde09d;
    padding: 10px;
  }

  .comics-item{
    margin: 10px 0px;
    text-align: left;
  }
  .comics-item>div{
    font-size: 18px;
    /* background-color: #b9cbce; */
    background-color: #fcfcfc;
    box-shadow: 0 0 1px 3px rgb(234, 236, 234);
    -webkit-box-shadow: 0 0 1px 3px rgb(234, 236, 234);
    min-height: 28px;
    margin: 10px 0px 2px 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding: 4px 6px ;
   border-radius: 6px;
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
