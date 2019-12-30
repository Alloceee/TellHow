<template>
	<el-cascader :options="options"
	 :show-all-levels="false"
	  v-model="selectedOptions"
	   ref="cascaderAddr"
	  filterable>
	  <template slot-scope="{ node, data }">
	     <span>{{ data.label }}</span>
	     <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
	   </template>
	  </el-cascader>
</template>

<script>
	export default {
		name: 'AbroadCitySelect',
		data() {
			return {
				selectedOptions:'',
				options: [{
					value: '日韩',
					label: '日韩',
					children: [{
						value: '大阪',
						label: '大阪',
					}, {
						value: '静冈',
						label: '静冈',
					}, {
						value: '小松',
						label: '小松',
					}, {
						value: '首尔',
						label: '首尔',
					}, {
						value: '东京',
						label: '东京',
					}]
				}, {
					value: '美国',
					label: '美国',
					children: [{
						value: '纽约',
						label: '纽约',
					}, {
						value: '黄冈',
						label: '黄冈',
					}]
				}, {
					value: '北京',
					label: '北京'
				}, {
					value: '深圳',
					label: '深圳'
				}, {
					value: '上海',
					label: '上海'
				}],
			}
		}
	}
</script>

<style>
</style>
