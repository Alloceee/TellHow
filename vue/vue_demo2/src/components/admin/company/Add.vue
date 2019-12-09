<template>
	<el-page-header @back="goBack" content="添加航空公司">
		
	</el-page-header>
</template>

<script>
	export default {
		name: 'CompanyAdd',
		methods: {
			goBack() {
				console.log('go back');
			}
		}
	}
</script>

<style>
</style>
