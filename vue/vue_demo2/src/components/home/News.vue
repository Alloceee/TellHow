<template>
	<div style="min-height: 100%;">
		<div class="container">
			<el-card>
				<el-page-header @back="goBack" content="详情页面">
				</el-page-header>
				<el-card style="margin-top: 35px;">
					<el-select v-model="value" filterable placeholder="航班号查询">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
						  <span style="float: left">{{ item.number }}</span>
						  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.model }}</span>
					    </el-option>
					  </el-select>
					  <el-button icon="el-icon-search"></el-button>
				</el-card>
				<el-card style="margin-top: 30px;margin-bottom: 20px;">
					<el-row>
						<el-col>
							<h4 class="title">{{this.news.title}}</h4>
						</el-col>
						<el-col :span="6" :offset="3">
							<el-col>实际起飞</el-col>
							<el-col><h4>{{this.news.planStartTime}}</h4></el-col>
							<el-col>计划起飞</el-col>
							<el-col>{{this.news.planStartTime}}</el-col>
						</el-col>
						<el-col :span="6">
							<el-col v-if="this.news.status == 0">
								<el-button class="circle-button" type="success" circle>计划</el-button>
							</el-col>
							<el-col v-else-if="this.news.status == 1">
								<el-button class="circle-button" type="danger" circle>延误</el-button>
							</el-col>
						</el-col>
						<el-col :span="6">
							<el-col>实际到达</el-col>
							<el-col><h4>{{this.news.planEndTime}}</h4></el-col>
							<el-col>计划到达</el-col>
							<el-col>{{this.news.planEndTime}}</el-col>
						</el-col>
						<el-col :span="6" :offset="3">
							<el-col>深圳{{this.news.startCity}}</el-col>
							<el-col>机场{{this.news.startAirport}}</el-col>
						</el-col>
						<el-col :span="6">
							<el-col v-if="this.news.status == 0">
								<el-progress :percentage="100" status="success"></el-progress>
							</el-col>
							<el-col v-else-if="this.news.status == 1">
								<el-progress :percentage="100" status="danger"></el-progress>
							</el-col>
						</el-col>
						<el-col :span="6">
							<el-col>武汉{{this.news.endCity}}</el-col>
							<el-col>机场{{this.news.endAirport}}</el-col>
						</el-col>
					</el-row>
				</el-card>
			</el-card>
		</div>
		<div style="position: absolute;bottom: 0;width: 100%;">
			<Footer></Footer>
		</div>
		<Backtop></Backtop>
	</div>
</template>

<script>
	import Footer from '@/components/home/comm/Footer.vue'
	import Backtop from '@/components/home/utils/Backtop.vue'
	export default {
		data() {
			return {
				news: '',
				  options: [{
				          value: '选项1',
				          label: '黄金糕'
				        }, {
				          value: '选项2',
				          label: '双皮奶'
				        }, {
				          value: '选项3',
				          label: '蚵仔煎'
				        }, {
				          value: '选项4',
				          label: '龙须面'
				        }, {
				          value: '选项5',
				          label: '北京烤鸭'
				        }],
				        value: ''
			}
		},
		created() {
			var href = location.href;
			var arr = href.split("/");
			var id = arr[arr.length - 1];
			this.$axios
				.get('/news/' + id)
				.then(resp => {
					if (resp.data.code === 200) {
						this.news = resp.data.data;
					}
				});
		},
		components: {
			Footer,
			Backtop
		},
		methods: {
			goBack() {
				location.href="/"
			}
		}
	}
</script>

<style scoped="scoped">
	.el-row{
		text-align: center;
	}
	.el-col{
		min-height: 35px;
	}
	.circle-button{
		height: 110px;
		width: 110px;
		font-size: 25px;
	}
	.title{
		height: 90px;
		line-height: 60px;
		font-weight: 400;
	}
	.el-progress{
		height: 60px;
		line-height: 60px;
	}
</style>
