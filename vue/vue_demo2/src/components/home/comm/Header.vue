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
		<Swiper></Swiper>
	</div>

</template>

<script>
	import Swiper from '@/components/home/comm/Swiper.vue'
	export default {
		name: 'Header',
		components: {
			Swiper
		}
	}
</script>

<style scoped="scoped">
	.header{
		width: 100%;
		position: absolute;
		z-index: 2;
	}
	.header-1 {
		height: 35px;
		line-height: 35px;
		background: rgba(29, 29, 29, 0.31);
	}
	
	.header-1 i {
		display: block;
		width: 35px;
		height: 35px;
		line-height: 35px;
		float: right;
	}
	
	.header-2 {
		top: 35px;
		height: 80px;
	}
	
	.header-2 .logo {
		width: 80px;
		float: left;
	}
	
	.header-2 img {
		height: 80px;
	}
	/* 搜索框 */
	.search-container input {
		font-family: "微软雅黑", serif;
		position: absolute;
		right: 250px;
		top: 50px;
		width: 45px;
		height: 45px;
		outline: none;
		border: none;
		background: #FFA50A;
		color: white;
		text-shadow: 0 0 10px #FFA50A;
		padding: 0 80px 0 20px;
		border-radius: 30px;
		box-shadow: 0 4px 16px 0 rgba(255, 102, 0, 0.32);
		transition: all 1s;
		opacity: 0;
		z-index: 5;
		letter-spacing: 0.1em;
	}
	
	.search-container input[type="text"]::placeholder {
		color: white;
	}
	
	.search-container input[type="checkbox"] {
		cursor: pointer;
		z-index: 99;
	}
	
	.search-container input[type="checkbox"]:checked+input[type="text"] {
		width: 290px;
		opacity: 1;
		right: 290px;
	}
	
	.search-container input[type="checkbox"]:checked~.search {
		right: 270px;
		background: #FF7700;
	}
	
	.search-container input[type="checkbox"]:checked~.search::after {
		top: 0;
		right: -5px;
		width: 25px;
		height: 2px;
		background: white;
		border: none;
		transform: rotate(135deg);
		transition: all .5s;
	}
	
	.search-container input[type="checkbox"]:checked~.search::before {
		top: 0;
		right: 18px;
		width: 25px;
		transition: all .5s;
	}
	
	.search-container input[type="checkbox"]:checked {
		right: 270px;
	}
	
	.search-container .search {
		position: absolute;
		right: 250px;
		top: 40px;
		width: 65px;
		height: 65px;
		background: #FFA50A;
		border-radius: 50%;
		transition: all 1s;
		z-index: 6;
		box-shadow: 0 4px 16px 0 rgba(255, 102, 0, 0.32);
		cursor: pointer;
	}
	
	
	.search-container .search::before {
		content: "";
		position: absolute;
		margin: auto;
		top: 22px;
		right: 0;
		bottom: 0;
		left: 22px;
		width: 12px;
		height: 2px;
		background: white;
		transform: rotate(45deg);
		transition: all .5s;
	}
	
	.search-container .search::after {
		content: "";
		position: absolute;
		margin: auto;
		top: -5px;
		right: 0;
		bottom: 0;
		left: -5px;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 2px solid white;
		transition: all .5s;
	}
</style>
