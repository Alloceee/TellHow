<template>
	<div>
		<div class="container">
			<el-card>
				<el-page-header  @back="goBack" content="详情页面">
				</el-page-header>
				<el-card>
					查询
				</el-card>
				<el-card>
					<el-row>
						<el-col><h5>{{this.news.title}}</h5></el-col>
						<el-col>
						
						 <el-col>计划起飞</el-col>
						 <el-col>{{this.news.planStartTime}}</el-col>
						 <el-button type="success" circle>计划</el-button>
						 <el-button type="danger" circle>延误</el-button>
						{{this.news.status}}
						{{this.news.planEndTime}}
						</el-col>
					</el-row>
				</el-card>
			</el-card>
		</div>
		<Footer></Footer>
		<Backtop></Backtop>
		</div>
</template>

<script>
	import Footer from '@/components/home/comm/Footer.vue'
	import Backtop from '@/components/home/utils/Backtop.vue'
	export default {
		data() {
			return {
				news: ''
			}
		},
		created(){
			var href = location.href;
			var arr = href.split("/");
			var id = arr[arr.length-1];
			this.$axios
				.get('/news/'+id)
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
	        console.log('go back');
	      }
	    }
	  }
</script>

<style>
</style>
