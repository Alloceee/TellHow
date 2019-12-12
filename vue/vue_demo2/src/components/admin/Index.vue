<template>
	<div class="homeBox">
		<el-container>
			<el-aside>
				<NavMenu></NavMenu>
			</el-aside>
			<el-container>
				<el-card style="width: 90%;">
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
		position: fixed;
		bottom: 0;
		float: right;
	}
</style>
