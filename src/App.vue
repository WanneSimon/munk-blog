<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- 导航 -->
    <DrawerNav></DrawerNav>
    <router-view :key="router_key" />
  </div>
</template>

<script>
import DrawerNav from './components/DrawerNav.vue'

export default {
  name: 'App',
components: { DrawerNav },
  computed: {
		router_key() {
			return this.$route.path + Math.random()
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
  min-width: 720px;
  /* margin-top: 60px; */
}
 
  .blank_L, .blank_R {
    border-radius: 4px;
    min-height: 20px;
  }
  
  .float-block{
    padding: 4px 10px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 8px 18px rgba(0,0,0,.2);
  }
</style>
