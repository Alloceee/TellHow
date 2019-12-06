<template>
	<div id="app">
		<Header></Header>
		<div class="container">
			<Search/>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from './components/home/comm/Header.vue'
	import Search from './components/home/comm/Search.vue'
	import Footer from './components/home/comm/Footer.vue'
	// import '@/assets/js/app.js'

	export default {
		name: 'app',
		components: {
			Search,
			Header,
			Footer
		}
	}
</script>

<style>
	/* #app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	} */
</style>
