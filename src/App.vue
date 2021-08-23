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
// import DrawerNav from './components/DrawerNav.vue'
import DrawerNav from './components/DrawerNavIcon.vue'
// import LoginModule from './components/LoginModule.vue'
import mbapi from './cfg/mbapi.js'
// import visited from './other/other.js'

export default {
  name: 'App',
  // components: { DrawerNav, LoginModule },
  components: { DrawerNav },
  computed: {
		router_key() {
			return this.$route.path + Math.random()
		},
	},
  created: function(){
    this.auth()

    // 访问this.$cookies.config(-1, '/')
    this.visited()
  },
  methods: {
    auth(){
      // 查询是否有 token
      if( !this.$base.login.isLogined ){
        mbapi.auth({}, (res) => {
          if( typeof(res.data) == 'object'  ){
            this.$store.commit('auth', res)
          }
        })
      }
    },
    visited(){
      let keyName = 'mb-vis'
      let vis = this.$cookies.get(keyName)
      console.log('vis', vis)
      if(!vis){
          this.$cookies.set(keyName, '1', 0, '/')
          mbapi.visited()
      }
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
  min-height: 500px;
  /* margin-top: 60px; */
}

  .blank_L, .blank_R {
    border-radius: 4px;
    min-height: 1px;
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

  /** 行内代码的样式 */
  .inner-line-code{
      background-color: #cecece;
      padding: 0px 4px;
      border-radius: 2px;
  }
</style>
