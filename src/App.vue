<template>
  <div id="app">
	  <!-- 如果要使用exclude，组件需要有name值 -->
	  <keep-alive exclude="Detail">
	    <router-view></router-view>
	  
	  </keep-alive>
	
	
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
	import MainTabBar from "components/content/mainTabBar/MainTabBar.vue"
	export default {
		name: 'App',
		components: {
			MainTabBar
		}
	}
</script>

<style >
	@import "assets/css/reset.css";
</style>
