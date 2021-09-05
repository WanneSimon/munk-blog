<template>
    <div class="wrapper">
        <el-row class="top-player">
            <el-col class="blank_L" :md="6" :sm="0"></el-col>
            <el-col class="player" :md="12" :sm="24">
                <Aplayer :music.sync="current.playing" :list.sync="current.list"  :listFolded="current.listFolded"
                    ref="aplayer" :volume="0.4">
                </Aplayer>
            </el-col>
            <el-col class="blank_R" :md="6" :sm="0"></el-col>
        </el-row>

        <el-row style="height:90vh;margin-top:10vh;">
        <el-col :class="'originGroup'" :md="4" :sm="8" :xs="0">
            <el-button type="warning" icon="el-icon-plus" circle
                @click="$refs.addOrEditMusic.show('addOrEdit')"></el-button>
            <el-button type="danger" icon="el-icon-warning-outline" circle
                @click="clearCurrentList()" ></el-button>
            <div
                v-for="value,g in groups" :key="g" :title="g"
                class="clickable group group-card" 
                >
                <div class="group-content" @click="setSelected(g)">
                    <div class="left-content">{{g}}</div> 
                    <i class="el-icon-arrow-right right-arrow"></i>
                </div>
            </div>
        </el-col>

        <el-col class="slist-wrapper" :md="20" :sm="16" :xs="24"
                 :loading="listLoading">
            <div class="slist box">
                <el-pagination v-if="showGroup.page>1"
                    background layout="prev, pager, next"
                    :page="showGroup.page" :total="showGroup.total"
                    @current-change="pageChange">
                </el-pagination>

                <div class="song-card" v-for="s,index in showGroup.songs" :key="index" >
                    <el-row>
                        <el-col :span="1" class="blank_L"></el-col>
                        <el-col :span="9" style="color:#5a7cbb">{{s.name ? s.name: '&emsp;'}}</el-col>
                        <el-col :span="8" style="color:#7d907d"> &emsp;{{s.artis ? s.artis: '&emsp;'}}</el-col>
                        <el-col :span="6" class="card-opts">  
                            &emsp;<i class="el-icon-video-play" style="color:#b31515"
                                @click="addToCurrentListAndPlay(s)"></i>
                            &emsp;<i class="el-icon-circle-plus-outline" style="color:#b31515"
                                @click="addToCurrentList(s)" ></i>
                            &emsp;<i class="el-icon-info" style="color:#adcec3" 
                                @click="$refs.addOrEditMusic.show('show', s)"></i>
                            &emsp;<i v-if="$store.state.login.isLogined" class="el-icon-edit"
                                @click="$refs.addOrEditMusic.show('addOrEdit', s)"
                                style="color:#ff0000"></i>
                        </el-col>
                    </el-row>
                </div>


            </div>
        </el-col>

        </el-row>
        
        <add-or-edit-music ref="addOrEditMusic"></add-or-edit-music>
    </div>
</template>

<script src='./music.js'>
</script>

<style scoped lang="scss">
@import './music.scss';
</style>
