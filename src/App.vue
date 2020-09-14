<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view :key="router_key" />
  </div>
</template>

<script>
export default {
  name: 'App',
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
  /* margin-top: 60px; */
}
</style>
