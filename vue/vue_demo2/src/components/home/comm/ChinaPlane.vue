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
								<el-col>客机机型：{{ plane.model }}</el-col>
								<el-col v-if="plane.type===0">客机型号：小型</el-col>
								<el-col v-else-if="plane.type===1">客机型号：中型</el-col>
								<el-col v-else-if="plane.type===2">客机型号：大型</el-col>
								<el-col>客机序号：{{ plane.number }}</el-col>
							</el-col>
							<el-col :span="12">
								<el-col><h3>{{ plane.name }}</h3><img :src="plane.icon"></el-col>
							</el-col>
						</el-row>
						<el-card shadow="hover" slot="reference">
							<el-row :gutter="20">
								<el-col>{{ plane.startCity }} <i class="el-icon-sort"></i> {{ plane.endCity }}</el-col>
								<el-col>{{ plane.startTime }}</el-col>
								<el-col><h4 style="color: indianred;float: right;">{{ plane.price }} ￥</h4></el-col>
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
				gridData:'',
				chinaPlane: ''
			};
		},
		created() {
			var _this = this;
			this.$axios
				.post('/china_plane', {
					currentPage:1,
					pageSize:9,
					startCity: "武汉",
					endCity: "深圳",
					orderByField:'start_time'
				})
				.then(resp => {
					if (resp.data.code === 200) {
						_this.chinaPlane = resp.data.data.records;
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
	.el-card{
		cursor: pointer;
	}
	img{
		width: 150px;
	}
</style>
