<template>
    <div>
        <div style="margin:20px 10px">
            <input v-model="url" style="width:30rem"  />
            <button class="button" @click="watchVideo">切换源</button>
            <div v-if="noSource"> 没有视频源可用 </div>
        </div>
        
        <!-- <img src="assets/img/close.png" @click="handleVideoVisible"> -->
        <!-- <video :src="'http://www.wanforme.cc:9003/live/livestream/1.flv'" :controls="'controls'"> -->
        <video id="videoElement" controls='controls' autoplay width="1366px" height="768px">
            您的浏览器不支持 ！
        </video>


        <!-- <video :src="'http://www.wanforme.cc:9003/live/livestream/1.m3u8'" :controls="'controls'">
        您的浏览器不支持 2
        </video>

        <video :src="'http://www.wanforme.cc:9003/live/livestream/1.mp4'" :controls="'controls'">
        您的浏览器不支持 3
        </video> -->

    </div>
</template>

<script>
import flvjs from 'flv.js'

export default {
    name : "live",
    data(){
        return {
            url: 'http://www.wanforme.cc:9003/live/livestream/1.flv',
            flvPlayer: null,
            noSource: false
        }
    },
    mounted: function() {
        var u = this.$route.params.url
        if(!u) {
            this.noSource = true;
            // u = 'http://www.wanforme.cc:9003/live/livestream/1.flv'
        }
        this.initPlayer(u);
    },
    methods: {
        initPlayer(url) {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: true,
                    url: url,
                    // url: 'http://1011.hlsplay.aodianyun.com/demo/game.flv'
                    // url: 'http://www.wanforme.cc:9003/live/livestream/1.flv'
                });
                this.flvPlayer.attachMediaElement(videoElement);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
        },

        handleVideoVisible() { // 控制视频弹窗开关
           this.isVideoVisible = !this.isVideoVisible;
        },
        watchVideo() { //打开视频
            this.$router.push({ name: "live", params: { url: this.url}})
        }
    }

}
</script>

<style scoped>

</style>

