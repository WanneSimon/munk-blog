<template>
  <div>
    <Aplayer autoplay :music="{
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
      }">
    </Aplayer>
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
</style>
