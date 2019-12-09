<template>
	<div>
		<el-divider content-position="left">国外航班</el-divider>
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
	export default{
		name:'AboradPlane'
	}
</script>

<style scoped="scoped">
	  .el-col {
	    margin: 5px 0;
	  }
</style>
