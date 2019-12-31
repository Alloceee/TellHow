<template>
	<div>
		<el-card shadow="never">
			<el-table :data="tableData" :height="tableHeight" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="通知航班">
								<span>{{ props.row.notify_fight }}</span>
							</el-form-item>
							<el-form-item label="通知内容">
								<span>{{ props.row.notify_content }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="标题" width="200" prop="title">
				</el-table-column>
				<el-table-column label="计划开始时间" width="200" prop="planStartTime">
				</el-table-column>
				<el-table-column label="计划结束时间" width="200" prop="planEndTime">
				</el-table-column>
				<el-table-column label="状态" width="100" prop="status">
					 <template slot-scope="scope">
						 <el-tag v-if="scope.row.status===0">计划正常</el-tag>
						 <el-tag v-else-if="scope.row.status===1">延迟</el-tag>
					  </template>
				</el-table-column>
				<el-table-column align="right">
					<template slot="header" slot-scope="scope">
						<el-row :gutter="10">
							<el-col :span="18">
								<el-input v-model="key" @change="search" size="mini" placeholder="输入关键字搜索">
									<i slot="prefix" class="el-input__icon el-icon-search"></i>
								</el-input>
							</el-col>
						<el-button-group>
								<el-popover placement="top" width="160" v-model="allDel">
									<p>确定一次删除所选内容吗？</p>
									<div style="text-align: right; margin: 0">
										<el-button size="mini" type="text" @click="allDel = false">取消</el-button>
										<el-button type="primary" size="mini" @click="deleteAll()">确定</el-button>
									</div>
									<el-button slot="reference" type="danger" size="mini">
										<i class="el-icon-delete"></i>
									</el-button>
								</el-popover>
								<el-popover placement="top" width="200">
									<p>导出excel</p>
									<div style="text-align: right; margin: 0">
										<el-button type="primary" size="mini" @click="exportSelect()">所选数据</el-button>
										<el-button type="primary" size="mini" @click="exportAll()">所有数据</el-button>
									</div>
									<el-button size="mini" slot="reference">
										<i class="el-icon-document-add"></i>
									</el-button>
								</el-popover>
								<el-button size="mini">
									<i class="el-icon-printer"></i>
								</el-button>
							</el-button-group>
						</el-row>
					</template>
					<template slot-scope="scope">
						<el-button-group>
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
							<i class="el-icon-edit"></i>
						</el-button>
						<el-button type="danger" size="mini" @click="openDel(scope.$index, scope.row)">
							<i class="el-icon-delete"></i>
						</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-pagination small="" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" @size-change="handleSizeChange"
		 @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[7, 20, 40, 70,100]" :page-size="pageSize">
		</el-pagination>
		<el-dialog title="提示" :visible.sync="del" width="30%" center>
			<span>确定删除？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="del = false">取 消</el-button>
				<el-button type="primary" @click="handleDelete()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改公司信息" :visible.sync="dialogFormVisible">
			<el-form :model="news" :rules="rules" ref="news" label-width="100px" class="demo-ruleForm">
				<el-form-item label="新闻标题" prop="title">
					<el-input v-model="news.title"></el-input>
				</el-form-item>
				<el-form-item label="航班计划时间" prop="content">
					<DateTimePicker ref="planTime"  v-model="news.planTime"></DateTimePicker>
				</el-form-item>
				<el-form-item label="通知航班" prop="notifyFight">
					<el-cascader placeholder="试试搜索：指南" v-model="news.notifyFight" :options="options" :props="{ multiple: true }"
					 filterable></el-cascader>
				</el-form-item>
				<el-form-item label="通知内容" prop="notifyContent">
					<el-input type="textarea" :rows="7" v-model="news.notifyContent"></el-input>
				</el-form-item>
				<el-form-item label="航班状态" prop="status">
					<el-switch v-model="news.status" active-color="#13ce66" inactive-color="#ff4949" active-text="计划" inactive-text="延误">
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit('company')">修 改</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import DateTimePicker from '@/components/home/utils/DateTimePicker.vue'
	export default {
		name: 'NewsShow',
		components: {
			DateTimePicker
		},
		data() {
			return {
				allDel: false,
				del: false,
				dialogTableVisible: false,
				dialogFormVisible: false,
				delData: '',
				currentPage: 1,
				pageSize: 7,
				pageTotal: 0,
				tableHeight: window.innerHeight - 250,
				tableData: '',
				key: '',
				imageUrl: '',
				news: {
					title: '',
					notifyFight: '',
					notifyContent: '',
					status: '',
					planTime:''
				},
				options: [{
					value: 'zhinan',
					label: '起飞时间12-25',
					}],
				formLabelWidth: '120px',
				rules: {
					title: [{
							required: true,
							message: '请输入公司名称',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			this.initDate();
		},
		methods: {
			initDate() {
				this.$axios
					.post('/admin/news/all', {
						pageSize: this.pageSize,
						currentPage: this.currentPage
					})
					.then(resp => {
						if (resp.data.code === 200) {
							var data = resp.data.data;
							this.tableData = data.records;
							this.pageTotal = data.total;
						}
					})
					.catch(failResponse => {})
			},
			// 编辑
			handleEdit(index, row) {
				this.news.title = row.title;
				this.news.planTime = [row.planStartTime,row.planEndTime];
				this.news.notifyFight = row.notifyFight;
				this.news.notifyContent = row.notifyContent;
				this.news.status = row.status===0?true:false;
				this.dialogTableVisible = true;
				this.dialogFormVisible = true;
			},
			openDel(index, row) {
				this.del = true;
				this.delData = [row];
			},
			// 删除
			handleDelete() {
				this.delete();
				this.del = false;
			},
			deleteAll() {
				this.delData = this.multipleSelection
				this.delete();
				this.allDel = false;
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			//获取多选数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 头像上传
			handleAvatarSuccess(res, file) {
				if (res.code === 200) {
					this.$message({
						message: res.msg,
						type: 'success'
					})
					this.imageUrl = URL.createObjectURL(file.raw);
					this.company.icon = res.data;
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === ('image/jpeg') || ('image/png');
				const isLt5M = file.size / 1024 / 1024 < 5;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt5M) {
					this.$message.error('上传头像图片大小不能超过 5MB!');
				}
				return isJPG && isLt5M;
			},
			//分页展示
			handleSizeChange(val) {
				this.pageSize = val;
				this.$axios
					.post('/admin/news/all', {
						pageSize: this.pageSize,
						currentPage: this.currentPage
					})
					.then(resp => {
						if (resp.data.code === 200) {
							var data = resp.data.data;
							this.tableData = data.records;
							this.pageTotal = data.total;
						}
					})
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.$axios
					.post('/admin/news/all', {
						pageSize: this.pageSize,
						currentPage: this.currentPage
					})
					.then(resp => {
						if (resp.data.code === 200) {
							var data = resp.data.data;
							this.tableData = data.records;
							this.pageTotal = data.total;
						}
					})
			},
			delete() {
				var _this = this;
				//发送删除请求
				this.$axios
					.post('/admin/news/del', {
						'news': this.delData
					})
					.then(resp => {
						if (resp.data.code === 200) {
							this.tableData = data;
							this.$message({
								message: resp.data.msg,
								type: 'success'
							});
							this.initDate();
						} else {
							this.$message.error('删除出错');
						}
					})
			},
			exportSelect() {
				this.$axios
					.post('/admin/export/news', {
						'companies': this.multipleSelection
					})
					.then(res => {
						var blob = new Blob([res.data]); 
						var downloadElement = document.createElement('a');
						var href = window.URL.createObjectURL(blob); //创建下载的链接
						downloadElement.href = href;
						downloadElement.download = headers['content-disposition']; //下载后文件名
						document.body.appendChild(downloadElement);
						downloadElement.click(); //点击下载
						document.body.removeChild(downloadElement); //下载完成移除元素
						window.URL.revokeObjectURL(href); //释放掉blob对象
					})
			},
			exportAll() {
				this.$axios
					.post('/admin/export/news', {
						'companies': this.tableData
					})
					.then(res => {
						var blob = new Blob([res.data]); //指定格式为vnd.ms-excel
						var downloadElement = document.createElement('a');
						var href = window.URL.createObjectURL(blob); //创建下载的链接
						downloadElement.href = href;
						downloadElement.download = '12.xls'; //下载后文件名
						document.body.appendChild(downloadElement);
						downloadElement.click(); //点击下载
						document.body.removeChild(downloadElement); //下载完成移除元素
						window.URL.revokeObjectURL(href); //释放掉blob对象
					})
			},
			//搜索表单信息
			search() {
				this.$axios
					.post('/admin/news/all', {
						pageSize: this.pageSize,
						currentPage: this.currentPage,
						key: this.key
					})
					.then(resp => {
						if (resp.data.code === 200) {
							var data = resp.data.data;
							this.tableData = data.records;
							this.pageTotal = data.total;
						}
					})
					.catch(failResponse => {})
			},
			//提交表单
			submit(formName) {
				console.log(this.$refs.planTime.time);
			// 	this.$refs[formName].validate((valid) => {
			// 		if (valid) {
			// 			this.$axios
			// 				.post('/admin/company/update', {
			// 					id: this.company.id,
			// 					name: this.company.name,
			// 					icon: this.company.icon,
			// 					description: this.company.description
			// 				})
			// 				.then(resp => {
			// 					if (resp.data.code === 200) {
			// 						var data = resp.data.msg;
			// 						this.$message({
			// 							message: data,
			// 							type: 'success'
			// 						});
			// 						this.initDate();
			// 						this.dialogTableVisible = false;
			// 						this.dialogFormVisible = false;
			// 					}
			// 				})
			// 		} else {
			// 			this.$message.error('修改出错');
			// 			return false;
			// 		}
			// 	});
			}
		}
	}
</script>

<style scoped="scoped">
	.el-pagination {
		float: right;
		margin: 15px;
	}

	.avatar-uploader {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar-uploader:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
		position: relative;
		margin-left: -89px;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
