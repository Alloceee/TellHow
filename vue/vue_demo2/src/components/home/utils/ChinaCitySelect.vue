<template>
	<el-cascader :options="options"
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
		name: 'ChinaCitySelect',
		data() {
			return {
				selectedOptions:'',
				options: [{
					value: '热门',
					label: '热门',
					children:[{
							value: '北京',
							label: '北京(BJS)'
						}, {
							value: '深圳',
							label: '深圳(SZX)'
						}, {
							value: '上海',
							label: '上海(SHA)'
						},{
							value: '广州',
							label: '广州(CAN)'
						},{
							value: '成都',
							label: '成都(CTU)'
						},{
							value: '杭州',
							label: '杭州(HGH)'
						},{
							value: '武汉',
							label: '武汉(WUH)'
						},{
							value: '西安',
							label: '西安'
						},{
							value: '重庆',
							label: '重庆'
						},{
							value: '青岛',
							label: '青岛'
						},{
							value: '长沙',
							label: '长沙'
						},{
							value: '南京',
							label: '南京'
						},{
							value: '厦门',
							label: '厦门'
						},{
							value: '昆明',
							label: '昆明'
						},{
							value: '大连',
							label: '大连'
						},{
							value: '天津',
							label: '天津'
						},{
							value: '郑州',
							label: '郑州'
						},{
							value: '三亚',
							label: '三亚'
						},{
							value: '济南',
							label: '济南'
						},{
							value: '福州',
							label: '福州'
						}]
				},{
					value: '直辖市',
					label: '直辖市',
					children: [{
						value: '北京',
						label: '北京',
					}, {
						value: '上海',
						label: '上海',
					}, {
						value: '天津',
						label: '天津',
					}, {
						value: '重庆',
						label: '重庆',
					}]
				},{
					value: '特别行政区',
					label: '特别行政区',
					children: [{
						value: '香港',
						label: '香港',
					}, {
						value: '澳门',
						label: '澳门',
					}]
				},{
					value: '安徽',
					label: '安徽',
					children: [{
						value: '合肥',
						label: '合肥',
					}, {
						value: '安庆',
						label: '安庆',
					}, {
						value: '亳州',
						label: '亳州',
					}, {
						value: '芜湖',
						label: '芜湖',
					}, {
						value: '马鞍山',
						label: '马鞍山',
					}, {
						value: '池州',
						label: '池州',
					}, {
						value: '黄山',
						label: '黄山',
					}, {
						value: '滁州',
						label: '滁州',
					}, {
						value: '淮南',
						label: '淮南',
					}, {
						value: '淮北',
						label: '淮北',
					}, {
						value: '蚌埠',
						label: '蚌埠',
					}, {
						value: '宿州',
						label: '宿州',
					}, {
						value: '宣城',
						label: '宣城',
					}, {
						value: '六安',
						label: '六安',
					}, {
						value: '阜阳',
						label: '阜阳',
					}, {
						value: '铜陵',
						label: '铜陵',
					}, {
						value: '明光',
						label: '明光',
					}, {
						value: '天长',
						label: '天长',
					}, {
						value: '宁国',
						label: '宁国',
					}, {
						value: '界首',
						label: '界首',
					}, {
						value: '桐城',
						label: '桐城',
					}, {
						value: '潜山',
						label: '潜山',
					}]
				},{
					value: '湖北',
					label: '湖北',
					children: [{
						value: '武汉',
						label: '武汉',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '咸宁',
						label: '咸宁',
					},{
						value: '襄阳',
						label: '襄阳',
					},{
						value: '荆州',
						label: '荆州',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					},{
						value: '荆门',
						label: '荆门',
					}]
				},{
					value: '福建',
					label: '福建',
					children: [{
						value: '福州',
						label: '福州',
					}, {
						value: '黄冈',
						label: '黄冈',
					}]
				},{
					value: '湖南',
					label: '湖南',
					children: [{
						value: '长沙',
						label: '长沙',
					}, {
						value: '郴州',
						label: '郴州',
					}]
				},{
					value: '河南',
					label: '河南',
					children: [{
						value: '郑州',
						label: '郑州',
					}, {
						value: '黄冈',
						label: '黄冈',
					}]
				},{
					value: '甘肃',
					label: '甘肃',
					children: [{
						value: '兰州',
						label: '兰州',
					}, {
						value: '白银',
						label: '白银',
					}]
				},{
					value: '湖北',
					label: '湖北',
					children: [{
						value: '武汉',
						label: '武汉',
					}, {
						value: '黄冈',
						label: '黄冈',
					}]
				},{
					value: '贵州',
					label: '贵州',
					children: [{
						value: '贵阳',
						label: '贵阳',
					}, {
						value: '安顺',
						label: '安顺',
					}]
				},{
					value: '海南',
					label: '海南',
					children: [{
						value: '海口',
						label: '海口',
					}, {
						value: '三亚',
						label: '三亚',
					}, {
						value: '万宁',
						label: '万宁',
					}, {
						value: '文昌',
						label: '文昌',
					}, {
						value: '儋州',
						label: '儋州',
					}, {
						value: '琼海',
						label: '琼海',
					}, {
						value: '东方',
						label: '东方',
					}, {
						value: '五指山',
						label: '五指山',
					}]
				},{
					value: '河北',
					label: '河北',
					children: [{
						value: '石家庄',
						label: '石家庄',
					}, {
						value: '保定',
						label: '保定',
					}]
				},{
					value: '黑龙江',
					label: '黑龙江',
					children: [{
						value: '哈尔滨',
						label: '哈尔滨',
					}, {
						value: '伊春',
						label: '伊春',
					}]
				},{
					value: '吉林',
					label: '吉林',
					children: [{
						value: '长春',
						label: '长春',
					}, {
						value: '吉林',
						label: '吉林',
					}]
				},{
					value: '江苏',
					label: '江苏',
					children: [{
						value: '南京',
						label: '南京',
					}, {
						value: '无锡',
						label: '无锡',
					}]
				},{
					value: '江西',
					label: '江西',
					children: [{
						value: '南昌',
						label: '南昌',
					}, {
						value: '赣州',
						label: '赣州',
					}]
				},{
					value: '辽宁',
					label: '辽宁',
					children: [{
						value: '沈阳',
						label: '沈阳',
					}, {
						value: '葫芦岛',
						label: '葫芦岛',
					}]
				},{
					value: '青海',
					label: '青海',
					children: [{
						value: '西宁',
						label: '西宁',
					}, {
						value: '格尔木',
						label: '格尔木',
					}, {
						value: '德令哈',
						label: '德令哈',
					}]
				},{
					value: '青海',
					label: '青海',
					children: [{
						value: '南京',
						label: '南京',
					}, {
						value: '无锡',
						label: '无锡',
					}]
				},{
					value: '山东',
					label: '山东',
					children: [{
						value: '济南',
						label: '济南',
					}, {
						value: '青岛',
						label: '青岛',
					}]
				},{
					value: '山西',
					label: '山西',
					children: [{
						value: '太原',
						label: '太原',
					}, {
						value: '大同',
						label: '大同',
					}]
				},{
					value: '陕西',
					label: '陕西',
					children: [{
						value: '西安',
						label: '西安',
					}, {
						value: '咸阳',
						label: '咸阳',
					}]
				},{
					value: '四川',
					label: '四川',
					children: [{
						value: '成都',
						label: '成都',
					}, {
						value: '广安',
						label: '广安',
					}]
				},{
					value: '云南',
					label: '云南',
					children: [{
						value: '昆明',
						label: '昆明',
					}, {
						value: '玉溪',
						label: '玉溪',
					}]
				},{
					value: '浙江',
					label: '浙江',
					children: [{
						value: '杭州',
						label: '杭州',
					}, {
						value: '宁波',
						label: '宁波',
					}]
				},{
					value: '台湾',
					label: '台湾',
					children: [{
						value: '台北',
						label: '台北',
					}, {
						value: '台南',
						label: '台南',
					}, {
						value: '台中',
						label: '台中',
					}, {
						value: '高雄',
						label: '高雄',
					}, {
						value: '桃源',
						label: '桃源',
					}]
				},{
					value: '广东',
					label: '广东',
					children: [{
						value: '广州',
						label: '广州',
					}, {
						value: '深圳',
						label: '深圳',
					}]
				},{
					value: '广西壮族自治区',
					label: '广西壮族自治区',
					children: [{
						value: '南宁',
						label: '南宁',
					}, {
						value: '贺州',
						label: '贺州',
					}]
				},{
					value: '内蒙古自治区',
					label: '内蒙古自治区',
					children: [{
						value: '呼和浩特',
						label: '呼和浩特',
					}, {
						value: '呼伦贝尔',
						label: '呼伦贝尔',
					}]
				},{
					value: '宁夏回族自治区',
					label: '宁夏回族自治区',
					children: [{
						value: '银川',
						label: '银川',
					}, {
						value: '固原',
						label: '固原',
					}]
				},{
					value: '西藏自治区',
					label: '西藏自治区',
					children: [{
						value: '拉萨市',
						label: '拉萨市',
					}, {
						value: '那曲',
						label: '那曲',
					}]
				},{
					value: '新疆维吾尔自治区',
					label: '新疆维吾尔自治区',
					children: [{
						value: '乌鲁木齐',
						label: '乌鲁木齐',
					}, {
						value: '石河子',
						label: '石河子',
					}]
				}]
			}
		}
	}
</script>

<style>
</style>
