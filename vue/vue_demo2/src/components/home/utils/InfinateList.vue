<template>
	<ul class="infinite-list" v-infinite-scroll="load" style="overflow-y:scroll;height: 260px;">
		<li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
	</ul>
</template>

<script>
	export default {
		name: 'InfinateList',
		data() {
			return {
				count: 40
			}
		},
		methods: {
			load() {
				this.count += 2
			}
		}
	}
</script>

<style>
</style>
