<template>
	<el-card class="box-card">
		<ul class="infinite-list" v-infinite-scroll="load" style="overflow-y:scroll;height: 260px;">
			<li v-for="i in news" class="infinite-list-item">
			<el-link :underline="false" @click="openNews(i.id)">{{ i.title }}</el-link>
			<time class="time">{{ i.createTime }}</time>
			</li>
		</ul>
	</el-card>
</template>

<script>
	export default {
		name: 'InfinateList',
		created() {
			this.$axios
				.get('/admin/news/all')
				.then(resp => {
					if (resp.data.code === 200) {
						this.news = resp.data.data;
					}
				})
				.catch(failResponse => {})
		},
		data() {
			return {
				count: 40,
				news: ''
			}
		},
		methods: {
			load() {
				this.count += 2
			},
			openNews(id){
				window.open("/news/"+id);
			}
		}
	}
</script>

<style scoped="scoped">
	.box-card{
		border: none;
	}
	.box-card li{
		margin: 5px 0;
	}
	.el-link{
		font-size: 15px;
	}
	.time {
	    font-size: 14px;
	    color: #999;
		float: right;
		margin-right: 20px;
	  }
</style>
