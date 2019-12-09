<template>
	<div id="result">
		<el-row>
			<el-col :span="24">
				<el-card shadow="never">
					飞机航班
				</el-card>
			</el-col>
		</el-row>
		<el-row class="infinite-list" v-infinite-scroll="load" style="overflow-y:scroll;height: 600px;">
			<el-col :key='i' :span="24" v-for="i in count" class="infinite-list-item">
				<el-card shadow="never">
					{{ i }}
					<i @click="open" class="el-icon-alarm-clock"></i>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'SearchResult',
		data() {
			return {
				count: 0
			}
		},
		methods: {
			load() {
				this.count += 2
			},
			open() {
				this.$prompt('请输入邮箱', '添加航班提醒', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
					inputErrorMessage: '邮箱格式不正确'
				}).then(({
					value
				}) => {
					this.$message({
						type: 'success',
						message: '你的邮箱是: ' + value + '，已发送添加成功通知，请确保邮箱填写正确'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消提醒'
					});
				});
			}
		}
	}
</script>

<style>
</style>
