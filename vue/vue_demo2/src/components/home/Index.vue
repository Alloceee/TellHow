<template>
	<div>
		<Header></Header>
		<div class="container">
			<Search />
			<ChinaPlane></ChinaPlane>
			<AbroadPlane></AbroadPlane>
		</div>
		<Footer></Footer>
		<Backtop></Backtop>
	</div>
</template>

<script>
	import Header from '@/components/home/comm/Header.vue'
	import Search from '@/components/home/comm/Search.vue'
	import ChinaPlane from '@/components/home/comm/ChinaPlane.vue'
	import AbroadPlane from '@/components/home/comm/AbroadPlane.vue'
	import Footer from '@/components/home/comm/Footer.vue'
	import Backtop from '@/components/home/utils/Backtop.vue'
	// import '@/assets/js/app.js'

	export default {
		name: 'Index',
		components: {
			Search,
			ChinaPlane,
			AbroadPlane,
			Header,
			Footer,
			Backtop
		}
	}
</script>

<style>
</style>
