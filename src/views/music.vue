<template>
  <div>
    <el-row>
      <el-col class="blank_L" :span="1" ></el-col>

      <el-col :span="6" class="scrolle-container mzc_group">

      </el-col>

      <el-col :span="16" class="scrolle-container">
        <div class="mzc_list">

        </div>

        <Aplayer autoplay :music="{
            title: 'Preparation',
            author: 'Hans Zimmer/Richard Harvey',
            src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
            lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
          }">
        </Aplayer>
      </el-col>

      <el-col class="blank_R" :span="1" ></el-col>
    </el-row>

  </div>
</template>

<script>
  import Aplayer from 'vue-aplayer'
  export default {
    name: 'music',
    components: { Aplayer },
    data () {
      return {

      }
    },
    created: function(){

    },
    methods: {

    },

  }

</script>

<style>
  .mzc_group{

  }
  
  .mzc_list{

  }
  
</style>
