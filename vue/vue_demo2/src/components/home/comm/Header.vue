<template>
	<div class="container-full">
		<!-- 头部导航栏 -->
		<div class="header">
			<div class="header-1">
				<div class="container">
					<span>让旅行更轻松</span>
					<span>Language</span>
					<i class="fa fa-wechat"></i>
					<i class="fa fa-qq"></i>
				</div>
			</div>
			<div class="header-2">
				<div class="container">
					<!-- <div class="logo">
	                    <img src="img/logo.png" />
	                </div> -->
					<div class="search-container">
						<input type="checkbox" />
						<input type="text" placeholder="输入要搜索的城市">
						<div class="search"></div>
					</div>
				</div>
			</div>
		</div>
		<Slick></Slick>
	</div>

</template>

<script>
	import Slick from '@/components/home/comm/Slick.vue'
	export default {
		name: 'Header',
		components: {
			Slick
		}
	}
</script>

<style>

</style>
