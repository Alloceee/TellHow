<template>
	<div class="homeBox">
		<el-container>
			<el-aside>
				<NavMenu></NavMenu>
			</el-aside>
			<el-container>
				<el-card style="width: 90%;overflow-y: scroll;">
					<el-header>
						<Header></Header>
					</el-header>
					<el-main>
						<router-view></router-view>
					</el-main>
					<el-footer>
						<Footer></Footer>
					</el-footer>
				</el-card>
			</el-container>
		</el-container>
	</div>

</template>

<script>
	import NavMenu from '@/components/admin/comm/NavMenu.vue'
	import Header from '@/components/admin/comm/Header.vue'
	import Footer from '@/components/admin/comm/Footer.vue'
	export default {
		name: 'Index',
		components: {
			NavMenu,
			Header,
			Footer
		}
	}
</script>

<style>
	html,
	body,
	#app,
	.homeBox,
	.el-container {
		padding: 0;
		margin: 0;
		height: 100%;
	}

	.el-footer {
		margin-bottom: 0;
		float: right;
	}
	::-webkit-scrollbar {
	  /*滚动条整体样式*/
	  width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
	  height: 1px;
	  }
	  ::-webkit-scrollbar-thumb {
	  /*滚动条里面小方块*/
	  border-radius   : 10px;
	  background-color: lightcoral;
	  background-image: -webkit-linear-gradient(
	      45deg,
	      rgba(255, 255, 255, 0.2) 25%,
	      transparent 25%,
	      transparent 50%,
	      rgba(255, 255, 255, 0.2) 50%,
	      rgba(255, 255, 255, 0.2) 75%,
	      transparent 75%,
	      transparent
	  );
	  }
	  ::-webkit-scrollbar-track {
	  /*滚动条里面轨道*/
	  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
	  background   : #ededed;
	  border-radius: 10px;
	  }
</style>
