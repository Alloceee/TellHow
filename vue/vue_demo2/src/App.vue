<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	import Index from '@/components/home/Index.vue'
	export default {
		name: 'app',
		components: {
			Index
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		min-height: 100%;
		/* text-align: center;
		color: #2c3e50; */
	}
</style>
