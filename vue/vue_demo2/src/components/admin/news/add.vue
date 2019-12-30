<template>
	<div>
		<el-page-header @back="goBack" content="添加新闻动态"></el-page-header>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form :model="news" :rules="rules" ref="news" label-width="100px" class="demo-ruleForm">
					<el-form-item label="新闻标题" prop="title">
						<el-input v-model="news.title"></el-input>
					</el-form-item>
					<el-form-item label="航班计划时间" prop="content">
						<DateTimePicker ref="time"></DateTimePicker>
					</el-form-item>
					<el-form-item label="所属航班" prop="notifyFight">
						<el-cascader placeholder="选择航班" v-model="news.notifyFight" :options="options" :props="{ multiple: true }"
						 filterable></el-cascader>
					</el-form-item>
					<el-form-item label="是否通知" prop="isNotify">
						<el-switch v-model="news.isNotify" active-text="通知" inactive-text="不通知">
						</el-switch>
					</el-form-item>
					<el-form-item label="通知内容" prop="notifyContent">
						<el-input type="textarea" :rows="7" v-model="news.notifyContent"></el-input>
					</el-form-item>
					<el-form-item label="航班状态" prop="status">
						<el-switch v-model="news.status" active-color="#13ce66" inactive-color="#ff4949" active-text="计划" inactive-text="延误">
						</el-switch>
					</el-form-item>
					<el-form-item>
						<el-button @click="fileUpload">
							<i class="el-icon-folder-add"></i>
						</el-button>
						<el-button type="primary" @click="submitForm('news')">添 加</el-button>
						<el-button @click="resetForm('news')">重 置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-dialog title="批量文件上传" :visible.sync="fileForm">
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange">
				<el-button type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="fileForm = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import DateTimePicker from '@/components/home/utils/DateTimePicker.vue'
	export default {
		name: 'NewsAdd',
		components: {
			DateTimePicker
		},
		created() {
			this.$axios
				.get('/admin/chinaFight/all')
				.then(resp => {
					var chinaFights = this.filterOptions(resp.data.data)
					this.options = [{
						label: '国内',
						children: chinaFights
					}]
				});
			this.$axios
				.get('/admin/abroadFight/all')
				.then(resp => {
					var abroadFights = this.filterOptions(resp.data.data)
					this.options.push({
						label: '国外',
						children: abroadFights
					});
				});
		},
		data() {
			return {
				imageUrl: '',
				news: {
					title: '',
					content: '',
					notifyFight: '',
					notifyContent: '',
					status: true,
					isNotify: false
				},
				fileForm: false,
				fileList: '',
				rules: {
					title: [{
						required: true,
						message: '请选择新闻标题',
						trigger: 'blur'
					}]
				},
				options: [{
					value: 'zhinan',
					label: '起飞时间12-25',
					children: [{
						value: 'shejiyuanze',
						label: '国内',
						children: [{
							value: 'yizhi',
							label: '起飞城市',
							children: [{
									value: 'id',
									label: '目的地',
									children: [{
										value: 'id',
										label: '航班序号',
									}]
								},
								{
									value: 'id',
									label: '目的地',
									children: [{
										value: 'id',
										label: '航班序号',
									}]
								}
							]
						}, {
							value: 'fankui',
							label: '反馈'
						}, {
							value: 'xiaolv',
							label: '效率'
						}, {
							value: 'kekong',
							label: '可控'
						}]
					}, {
						value: 'daohang',
						label: '国外',
						children: [{
							value: 'cexiangdaohang',
							label: '侧向导航'
						}, {
							value: 'dingbudaohang',
							label: '顶部导航'
						}]
					}]
				}, {
					value: 'zujian',
					label: '组件',
					children: [{
						value: 'basic',
						label: 'Basic',
						children: [{
							value: 'layout',
							label: 'Layout 布局'
						}, {
							value: 'color',
							label: 'Color 色彩'
						}, {
							value: 'typography',
							label: 'Typography 字体'
						}, {
							value: 'icon',
							label: 'Icon 图标'
						}, {
							value: 'button',
							label: 'Button 按钮'
						}]
					}, {
						value: 'form',
						label: 'Form',
						children: [{
							value: 'radio',
							label: 'Radio 单选框'
						}, {
							value: 'checkbox',
							label: 'Checkbox 多选框'
						}, {
							value: 'input',
							label: 'Input 输入框'
						}, {
							value: 'input-number',
							label: 'InputNumber 计数器'
						}, {
							value: 'select',
							label: 'Select 选择器'
						}, {
							value: 'cascader',
							label: 'Cascader 级联选择器'
						}, {
							value: 'switch',
							label: 'Switch 开关'
						}, {
							value: 'slider',
							label: 'Slider 滑块'
						}, {
							value: 'time-picker',
							label: 'TimePicker 时间选择器'
						}, {
							value: 'date-picker',
							label: 'DatePicker 日期选择器'
						}, {
							value: 'datetime-picker',
							label: 'DateTimePicker 日期时间选择器'
						}, {
							value: 'upload',
							label: 'Upload 上传'
						}, {
							value: 'rate',
							label: 'Rate 评分'
						}, {
							value: 'form',
							label: 'Form 表单'
						}]
					}, {
						value: 'data',
						label: 'Data',
						children: [{
							value: 'table',
							label: 'Table 表格'
						}, {
							value: 'tag',
							label: 'Tag 标签'
						}, {
							value: 'progress',
							label: 'Progress 进度条'
						}, {
							value: 'tree',
							label: 'Tree 树形控件'
						}, {
							value: 'pagination',
							label: 'Pagination 分页'
						}, {
							value: 'badge',
							label: 'Badge 标记'
						}]
					}, {
						value: 'notice',
						label: 'Notice',
						children: [{
							value: 'alert',
							label: 'Alert 警告'
						}, {
							value: 'loading',
							label: 'Loading 加载'
						}, {
							value: 'message',
							label: 'Message 消息提示'
						}, {
							value: 'message-box',
							label: 'MessageBox 弹框'
						}, {
							value: 'notification',
							label: 'Notification 通知'
						}]
					}, {
						value: 'navigation',
						label: 'Navigation',
						children: [{
							value: 'menu',
							label: 'NavMenu 导航菜单'
						}, {
							value: 'tabs',
							label: 'Tabs 标签页'
						}, {
							value: 'breadcrumb',
							label: 'Breadcrumb 面包屑'
						}, {
							value: 'dropdown',
							label: 'Dropdown 下拉菜单'
						}, {
							value: 'steps',
							label: 'Steps 步骤条'
						}]
					}, {
						value: 'others',
						label: 'Others',
						children: [{
							value: 'dialog',
							label: 'Dialog 对话框'
						}, {
							value: 'tooltip',
							label: 'Tooltip 文字提示'
						}, {
							value: 'popover',
							label: 'Popover 弹出框'
						}, {
							value: 'card',
							label: 'Card 卡片'
						}, {
							value: 'carousel',
							label: 'Carousel 走马灯'
						}, {
							value: 'collapse',
							label: 'Collapse 折叠面板'
						}]
					}]
				}]
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios
							.post('/admin/news/add', {
								title: this.news.title,
								planStartTime: this.$refs.time.time[0],
								planEndTime: this.$refs.time.time[1],
								notifyFight: this.news.notifyFight,
								notifyContent: this.news.notifyContent,
								status: this.news.status ? 0 : 1
							})
							.then(resp => {
								if (resp.data.code === 200) {
									var data = resp.data.msg;
									this.$message({
										message: data,
										type: 'success'
									});
									var path = this.$route.query.redirect
									this.$router.replace({
										path: path === '/admin/news/add' || path === undefined ? '/admin/news/show' : path
									})
								}
							})
							.catch(failResponse => {})
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			goBack() {
				console.log('go back');
			},
			fileUpload() {
				this.fileForm = true;
			},
			handleChange(file, fileList) {
				const isExcel = file.type === ('xls') || ('xlsx');
				this.fileList = fileList.slice(-3);
			},
			filterOptions(beforeData) {
				var tempArr = [];
				this.afterData = [];
				for (let i = 0; i < beforeData.length; i++) {
					if (tempArr.indexOf(beforeData[i].startCity) === -1) {
						this.afterData.push({
							label: beforeData[i].startCity,
							children: [beforeData[i]]
						});
						tempArr.push(beforeData[i].startCity);
					} else {
						for (let j = 0; j < this.afterData.length; j++) {
							if (this.afterData[j].label == beforeData[i].startCity) {
								this.afterData[j].children.push(beforeData[i]);
								break;
							}
						}
					}
				}
				for (let i = 0; i < this.afterData.length; i++) {
					var tempArr2 = [];
					this.afterDataChilds = [];
					this.afterDataChild = this.afterData[i].children;
					for (let m = 0; m < this.afterDataChild.length; m++) {
						if (tempArr2.indexOf(this.afterDataChild[m].endCity) === -1) {
							this.afterDataChilds.push({
								label: this.afterDataChild[m].endCity,
								children: [{
									label: this.afterDataChild[m].number,
									value: this.afterDataChild[m].id
								}]
							});
							tempArr2.push(this.afterDataChild[m].endCity);
						} else {
							for (let j = 0; j < this.afterDataChilds.length; j++) {
								if (this.afterDataChilds[j].label == this.afterDataChild[m].endCity) {
									this.afterDataChilds[j].children.push({
										label: this.afterDataChild[m].number,
										value: this.afterDataChild[m].id
									});
									break;
								}
							}
						}
					}
					this.afterData[i].children = this.afterDataChilds;
				}
				return this.afterData;
			}
		}
	}
</script>

<style scoped="scoped">
	.el-form {
		margin-top: 30px;
	}

	.el-upload__input {
		display: none !important;
	}

	.el-upload input[type="file"] {
		display: none !important;
	}
</style>
