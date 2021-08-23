<template>
    <div class="wrapper">
        <el-row class="top-player">
            <el-col class="blank_L" :md="6" :sm="0"></el-col>
            <el-col class="player" :md="12" :sm="24">
                <Aplayer :music="current.list[0]" :list="current.list" listFolded>
                </Aplayer>
            </el-col>
            <el-col class="blank_R" :md="6" :sm="0"></el-col>
        </el-row>


        <el-row style="height:90vh;margin-top:10vh;">
        <el-col :class="'originGroup'" :md="4" :sm="8" :xs="0">
            <div
                v-for="g,index in groups" :key="index" :title="g.name"
                class="clickable group group-card" 
                >
                <div class="group-content" @click="setSelected(index)">
                    <div class="left-content">{{g.name}}</div> 
                    <i class="el-icon-arrow-right right-arrow"></i>
                </div>
            </div>
        </el-col>

        <el-col class="slist-wrapper" :md="20" :sm="16" :xs="24"
                 :loading="listLoading">
            <div class="slist">
                <div class="song-card" v-for="s,index in showList" :key="index" >
                    <el-row>
                        <el-col :span="1" class="blank_L"></el-col>
                        <el-col :span="9">{{s.name ? s.name: '&emsp;'}}</el-col>
                        <el-col :span="8"> &emsp;{{s.artis ? s.artis: '&emsp;'}}</el-col>
                        <el-col :span="6"> &emsp;<i class="el-icon-video-play"></i> </el-col>
                    </el-row>
                </div>
            </div>
        </el-col>

        </el-row>
    </div>
</template>

<script src='./music.js'>
</script>

<style scoped lang="scss">
@import './music.scss';
</style>
