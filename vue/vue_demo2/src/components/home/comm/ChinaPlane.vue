<template>
	<div>
		<el-divider content-position="left">国内航班</el-divider>
		<el-card shadow="never">
			<el-row :gutter="12">
				<el-col :span="8" v-for="plane in this.chinaPlane">
					<el-popover placement="right" width="430" trigger="click">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-col>起飞机场：{{ plane.startAirport }}</el-col>
								<el-col>降落机场：{{ plane.endAirport }}</el-col>
								<el-col>客机机型：{{ plane.plane.model }}</el-col>
								<el-col v-if="plane.plane.type===0">客机型号：小型</el-col>
								<el-col v-else-if="plane.plane.type===1">客机型号：中型</el-col>
								<el-col v-else-if="plane.plane.type===2">客机型号：大型</el-col>
								<el-col>客机序号：{{ plane.plane.number }}</el-col>
							</el-col>
							<el-col :span="12">
								<el-col>{{ plane.plane.company.name }}<img :src="plane.plane.company.icon"></el-col>
								<el-col>{{ plane.plane.company.description }}</el-col>
							</el-col>
						</el-row>
						<el-card shadow="hover" slot="reference">
							<el-row :gutter="20">
								<el-col>{{ plane.startCity }} <i class="el-icon-sort"></i> {{ plane.endCity }}</el-col>
								<el-col>{{ plane.startTime }}</el-col>
								<el-col>{{ plane.price }} ￥</el-col>
							</el-row>
						</el-card>
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
				}],
				chinaPlane: {}
			};
		},
		created() {
			var _this = this;
			this.$axios
				.post('/china_plane', {
					startCity: "上海",
					endCity: "深圳"
				})
				.then(resp => {
					if (resp.data.code === 200) {
						var data = resp.data.data;
						_this.chinaPlane = data;
					}
				})
				.catch(failResponse => {})
		}
	}
</script>

<style scoped="scoped">
	.el-col {
		margin: 5px 0;
	}
	img{
		width: 150px;
	}
</style>
