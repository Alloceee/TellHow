<template>
	<div>
		<Header></Header>
		<div class="container">
			<Search />
			<SearchResult></SearchResult>
		</div>
		<Footer></Footer>
		<Backtop></Backtop>
	</div>
</template>

<script>
	import Header from '@/components/home/comm/Header.vue'
	import Search from '@/components/home/comm/Search.vue'
	import Footer from '@/components/home/comm/Footer.vue'
	import Backtop from '@/components/home/utils/Backtop.vue'
	import SearchResult from '@/components/home/comm/SearchResult.vue'
	// import '@/assets/js/app.js'
	
	export default {
		name: 'Index',
		components: {
			Search,
			SearchResult,
			Header,
			Footer,
			Backtop
		}
	}
</script>

<style>
</style>
