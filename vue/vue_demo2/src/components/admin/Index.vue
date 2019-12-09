<template>
	<el-container>
		<el-aside width="280px">
			<NavMenu></NavMenu>
		</el-aside>
		<el-container>
			<el-card style="width: 90%;">
				<el-header>Header</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
				<el-footer>Footer</el-footer>
			</el-card>
		</el-container>
	</el-container>
</template>

<script>
	import NavMenu from '@/components/admin/comm/NavMenu.vue'
	export default {
		name: 'Index',
		components: {
			NavMenu
		}
	}
</script>

<style>
</style>
