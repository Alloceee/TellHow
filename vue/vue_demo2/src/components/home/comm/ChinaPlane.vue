<template>
	<div>
		<el-divider content-position="left">国内航班</el-divider>
		<el-card shadow="never">
			<el-row :gutter="12">
				<el-col :span="8" v-for="item in 12">
					<el-popover placement="right" width="400" trigger="click">
						<el-table :data="gridData">
							<el-table-column width="150" property="date" label="日期">{{item}}</el-table-column>
							<el-table-column width="100" property="name" label="姓名"></el-table-column>
							<el-table-column width="300" property="address" label="地址"></el-table-column>
						</el-table>
						<el-card shadow="hover" slot="reference">鼠标悬浮时显示</el-card>
					</el-popover>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'ChinaPlane',
		data() {
			return {
				gridData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}]
			};
		}
	}
</script>

<style scoped="scoped">
	.el-col {
	  margin: 5px 0;
	}
</style>
