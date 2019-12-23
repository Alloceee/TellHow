<template>
	<div>
		<el-card shadow="never">
			<el-table :data="tableData" :height="tableHeight" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="公司名称">
								<span>{{ props.row.name }}</span>
							</el-form-item>
							<el-form-item label="公司详情">
								<span>{{ props.row.description }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="ID" width="100">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="公司名称" width="240" prop="name">
				</el-table-column>
				<el-table-column label="公司图标" width="200" prop="icon">
					<template slot-scope="scope">
						<el-avatar shape="square" v-if="scope.row.icon" :size="50" :src="scope.row.icon"></el-avatar>
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
							<el-col :span="2">
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
							</el-col>
							<el-col :span="2">
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
							</el-col>
							<el-col :span="2">
								<el-button size="mini">
									<i class="el-icon-printer"></i>
								</el-button>
							</el-col>
						</el-row>
					</template>
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
							<i class="el-icon-edit"></i>
						</el-button>
						<el-button type="danger" size="mini" @click="openDel(scope.$index, scope.row)">
							<i class="el-icon-delete"></i>
						</el-button>
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
			<el-form :model="company" ref="company" :rules="rules">
				<el-form-item label="公司名称" :label-width="formLabelWidth" prop="name">
					<el-input v-model="company.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="公司图标" :label-width="formLabelWidth" prop="icon">
					<el-upload class="avatar-uploader" action="http://localhost:8443/api/admin/company/icon" :show-file-list="false"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="company.icon" :src="company.icon" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="公司介绍" :label-width="formLabelWidth" prop="description">
					<el-input type="textarea" :rows="7" v-model="company.description"></el-input>
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
	export default {
		name: 'NewsShow',
		data() {
			return {
				allDel: false,
				del: false,
				dialogTableVisible: false,
				dialogFormVisible: false,
				delData: '',
				currentPage: 1,
				pageSize: 7,
				pageTotal: '',
				tableHeight: window.innerHeight - 250,
				tableData: '',
				key: '',
				imageUrl: '',
				company: {
					id: '',
					name: '',
					icon: '',
					description: ''
				},
				formLabelWidth: '120px',
				rules: {
					name: [{
							required: true,
							message: '请输入公司名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '长度在 2 到 10 个字符',
							trigger: 'blur'
						}
					],
					icon: [{
						required: true,
						message: '请上传公司标题'
					}],
					description: [{
						required: true,
						message: '请填写公司介绍',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.initDate();
		},
		methods: {
			initDate() {
				this.$axios
					.post('/admin/company/all', {
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
				this.company.id = row.id;
				this.company.name = row.name;
				this.company.description = row.description;
				this.company.icon = row.icon;
				this.dialogTableVisible = true;
				this.dialogFormVisible = true;
			},
			openDel(index, row) {
				this.del = true;
				this.delData = [row];
			},
			// 删除
			handleDelete() {
				console.log(this.delData);
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
					.post('/admin/company/all', {
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
					.post('/admin/company/all', {
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
					.post('/admin/company/del', {
						'companies': this.delData
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
					.post('/admin/export/company', {
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
					.post('/admin/export/company', {
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
					.post('/admin/company/all', {
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
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios
							.post('/admin/company/update', {
								id: this.company.id,
								name: this.company.name,
								icon: this.company.icon,
								description: this.company.description
							})
							.then(resp => {
								if (resp.data.code === 200) {
									var data = resp.data.msg;
									this.$message({
										message: data,
										type: 'success'
									});
									this.initDate();
									this.dialogTableVisible = false;
									this.dialogFormVisible = false;
								}
							})
					} else {
						this.$message.error('修改出错');
						return false;
					}
				});
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
