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
             <span class="head-bottom-login" v-if="$base.login.isLogined"> Hi~&emsp;{{$base.login.data.info.name}}<br></span>
             <span class="head-bottom-login" v-if="!($base.login.isLogined)" @click="showLogin()"> 登录 &emsp;</span>
             <!-- <span>&emsp;</span> -->
             <span class="head-bottom-repwd" v-if="$base.login.isLogined" @click="showRepwd()"> 修改 &emsp;</span>
             <!-- <span>&emsp;</span> -->
             <span class="head-bottom-logout" v-if="$base.login.isLogined" @click="logout()"> 退出 </span>
           </div>
         </div>
         <div class="nav-items"  @click="drawer = false">
            <!-- <router-link :to="'http://www.wanforme.cc'">主页</router-link> -->
            <!-- <div class="nav-item"><router-link :to="'/index'">主页</router-link></div> -->
            <div class="nav-item" style="color: #00BFFF;"><router-link :to="'/me'"> 主 页 </router-link></div>

            <el-divider content-position="center">*****</el-divider>

            <div class="nav-item"><router-link :to="'/comicWords'"> 语 录 </router-link></div>
            <div class="nav-item"><router-link :to="'/dailyLog'"> 动 态 </router-link></div>
            <div class="nav-item"><router-link :to="'/blog'"> 博 文 </router-link></div>
<!--            <div class="nav-item" style="color: #00BFFF;"><router-link :to="'/tree'" disabled> 书 签 </router-link></div>
            <div class="nav-item" style="color: #00BFFF;"><router-link :to="'/tree'"  disabled> 发 现 </router-link></div> -->

            <el-divider content-position="center">*****</el-divider>

            <div class="nav-item"><router-link :to="'/books'"> 书 架 </router-link></div>
            <div class="nav-item"><router-link :to="'/games'"> 游 戏 </router-link></div>
<!--            <div class="nav-item" style="color: #00BFFF;"><router-link :to="'/tree'"> 相 册 </router-link></div> -->

            <el-divider content-position="center">*****</el-divider>
<!--            <div class="nav-item" ><router-link :to="'/anniversary'" disabled> 纪 念 </router-link></div>
            <div class="nav-item" style="color: #00BFFF;"><router-link :to="'/tree'"> V 圈 </router-link></div> -->
            <div class="nav-item"><router-link :to="'/CV'"> C V </router-link></div>
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
            this.$base.login.isLogined = false
            this.$base.login.data.info = {}
            this.$base.login.data.auth = []
            this.$router.go({name: 'index'})
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

.nav-item{
  margin: 2px 0px;
   color: coral;
}
.nav-item a{
  /* width: 120px; */
  font-size: 1.2rem;
  text-decoration-line: none;
  color: inherit;
}

.part-unfinished{
  color: #00BFFF;
}

</style>
