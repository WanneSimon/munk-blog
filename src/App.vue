<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- 导航 -->
    <DrawerNav></DrawerNav>
    <router-view :key="router_key" />
    <!-- <LoginModule v-if="showLogin"></LoginModule> -->
  </div>
</template>

<script>
import DrawerNav from './components/DrawerNav.vue'
// import LoginModule from './components/LoginModule.vue'
import mbapi from './cfg/mbapi.js'

export default {
  name: 'App',
  // components: { DrawerNav, LoginModule },
  components: { DrawerNav },
  computed: {
		router_key() {
			return this.$route.path + Math.random()
		},
    // showLogin() {
    //   console.log("=== app ====")
    //   console.log(this.$base.login)
    //   return this.$base.login.show
    // },
	},
  created: function(){
    // 查询是否有 token
    if( !this.$base.login.isLogined ){
      mbapi.auth({}, (res) => {
        // console.log("登录信息")
        // console.log(res)
        // console.log(typeof(res.data))
        if( typeof(res.data) == 'object'  ){
          this.$base.login.isLogined = true
          this.$base.login.data.info = res.data.info
          this.$base.login.data.auth = res.data.auth
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fbf5f5cc;
  /* min-width: 980px; */
  min-height: 1px;
  /* margin-top: 60px; */
}

  .blank_L, .blank_R {
    border-radius: 4px;
    min-height: 20px;
    display: block !important;
  }

  .float-block{
    padding: 4px 10px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 8px 18px rgba(0,0,0,.2);
  }

  .text-ops{
    width: auto;
  }

  .scrolle-container{
    /* margin: 40px 0px 10px 0px; */
    margin: 0px;
    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */

    height:800px;
    overflow:auto;
  }
  /** 隐藏滚动条*/
  .scrolle-container::-webkit-scrollbar {
    width: 0 !important; /* 谷歌 safari*/
  }


</style>
