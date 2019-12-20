<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-input v-model="key" @change="search" placeholder="请输入要搜索的内容">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</el-col>
			<el-col :span="2" :offset="14">
				<el-dropdown>
					<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>王小虎</el-dropdown-item>
						<el-dropdown-item>注销</el-dropdown-item>
						<el-dropdown-item>锁定账号</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data() {
			return {
				key: ''
			}
		},
		methods: {
			search(key) {
				console.log(key)
			}
		}
	}
</script>

<style>
</style>
