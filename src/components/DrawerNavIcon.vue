<template>
    <div>
      <!-- 抽屉导航栏 -->
<!--       <el-button class="drawer-nav" @click="drawer = true"
        type="primary" style="margin-left: 16px;z-index: 2001;" >
         &gt;&gt;
       </el-button> -->

       <i class="el-icon-notebook-1 drawer-nav"
        @click="drawer = true"
       style="z-index: 2001; font-size:2rem;color: #38C0FF;">
       </i>

       <LoginModule :viewVisible='visible'></LoginModule>

       <el-drawer
         title="导航"
         :visible.sync="drawer" :direction="direction"
         :with-header="false">
         <div class="nav-head">
           <el-image :src="head_img" ></el-image>
           <div class="head-bottom">
             <!--
             <span class="head-bottom-login" v-if="$base.login.isLogined"> Hi~&emsp;{{$base.login.data.info.name}}<br></span>
             <span class="head-bottom-login" v-if="!($base.login.isLogined)" @click="showLogin()"> 登录 &emsp;</span>
             <span class="head-bottom-repwd" v-if="$base.login.isLogined" @click="showRepwd()"> 修改 &emsp;</span>
             <span class="head-bottom-logout" v-if="$base.login.isLogined" @click="logout()"> 退出 </span>
             -->
             <span class="head-bottom-login" v-if="$store.state.login.isLogined"> Hi~&emsp;{{$store.state.login.data.info.name}}<br></span>
             <span class="head-bottom-login" v-if="!($store.state.login.isLogined)" @click="showLogin()"> 登录 &emsp;</span>
             <span class="head-bottom-repwd" v-if="$store.state.login.isLogined" @click="showRepwd()"> 修改 &emsp;</span>
             <span class="head-bottom-logout" v-if="$store.state.login.isLogined" @click="logout()"> 退出 </span>
           </div>
         </div>
         <div class="nav-items"  @click="drawer = false">
            <el-divider class="line-divider" content-position="center" >
              <span class="line-divider-text"> (oﾟvﾟ)ノ </span>
            </el-divider>

            <div class="nav-item">
              <el-tooltip class="item" effect="dark" content="主页" placement="bottom" :hide-after='500'>
                <router-link :to="'/me'"> <i class="el-icon-user" style="color: #00BFFF;"></i></router-link>
              </el-tooltip>
            </div>

            <div class="nav-item">
              <el-tooltip class="item" effect="dark" content="语录" placement="bottom" :hide-after='500'>
                <router-link :to="'/comicWords'"> <i class="el-icon-postcard" style="color:#0438f3"></i> </router-link>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="动态" placement="bottom" :hide-after='500' >
                <router-link :to="'/dailyLog'"> <i class="el-icon-chat-dot-square" style="color:#f35c04"></i> </router-link>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="文章" placement="bottom" :hide-after='500'>
                <router-link :to="'/blog'"> <i class="el-icon-tickets" style="color:#aaab6d"></i> </router-link>
              </el-tooltip>
            </div>

            <div class="nav-item">
              <el-tooltip class="item" effect="dark" content="阅读理解" placement="bottom" :hide-after='500'>
                <router-link :to="'/books'"> <i class="el-icon-reading" style="color:#1cb92f"></i> </router-link>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="娱乐" placement="bottom" :hide-after='500'>
                <router-link :to="'/games'"> <i class="el-icon-s-platform" style="color:#741ea0" ></i> </router-link>
              </el-tooltip>
            </div>

            <el-divider class="line-divider" content-position="center">
              <span class="line-divider-text"> \^o^/ </span>
            </el-divider>

            <div class="nav-item">
              <el-tooltip class="item" effect="dark" content="收藏" placement="bottom" :hide-after='500'>
                <router-link :to="'/favi/'+this.$base.favoritesType.COLLECTION.name"> <i class="el-icon-collection" style="color:#b5442a"></i> </router-link>
              </el-tooltip>
            </div>

            <!-- <div class="nav-item"><router-link :to="'/CV'"> C V </router-link></div> -->
         </div>
       </el-drawer>

    </div>
</template>

<script>
  import LoginModule from './LoginModule.vue'
  import mbapi from '../cfg/mbapi.js'

  export default {
      name: 'DrawerNav',
      components: { LoginModule },
      data() {
        return {
          drawer: false,
          direction: 'ltr' ,//从右往左-rtl 从上往下-ttb 从下往上btt
          head_img: '/coco/static/images/t1.jpg', //菜单栏顶部图片

          // loginType: '', // login-登录, repwd-修改密码
          visible: {
            // show: false, // 总开关
            login: false,
            repwd: false
          },
        };
      },

      created: function(){

      },

      methods: {
        showLogin: function () {
          this.visible.login  = true
          this.visible.repwd  = false
        },
        showRepwd: function(){
          // this.visible.show  = true
          this.visible.login  = false
          this.visible.repwd  = true
        },
        logout: function () {
          // mbapi.logout(null, (res)=>{
          //   mbapi.auth(null, (ress)=>{
          //     console.log("退出后的权限")
          //     console.log(ress)
          //   })
          // })
          mbapi.logout(null, (res)=>{
            // this.$base.login.isLogined = false
            // this.$base.login.data.info = {}
            // this.$base.login.data.auth = []
            // this.$router.go({name: 'index'})
			this.$store.commit('logout', res)
          })
        }
      }
    };
</script>

<style>
 /** 分割线样式*/
.el-drawer{
  max-width: 280px;
}
.el-divider .el-divider__text{
  color: chartreuse
}

.drawer-nav{
  position: fixed;
  z-index: 100;
  width: 60px;
  height: 40px;
  margin: auto !important;
  top: -120px;
  /* right: 2px; */
  bottom: 2px;
  left: 2px;
}
.nav-head{
  /* background-color: deepskyblue; */
  position: relative;
}
.head-bottom{
  width: 100%;
  text-align: right;
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 2px 6px;
  background-color: rgba( 1, 1, 1, 0.5);
}
.head-bottom-login{
  color: greenyellow;
  cursor: pointer;
}
.head-bottom-repwd{
  color: orange;
  cursor: pointer;
}
.head-bottom-logout{
  color: crimson;
  cursor: pointer;
}

.nav-item a{
  /* width: 120px; */
  font-size: 1.4rem;
  text-decoration-line: none;
  color: inherit;
}

.part-unfinished{
  color: #00BFFF;
}

.line-divider-text{
  font-size: 1.1rem;
  color: #bf868c;
}

</style>
