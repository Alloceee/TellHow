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
								<span>{{ props.row.desc }}</span>
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
						<el-row :gutter="20">
							<el-col :span="20">
								<el-input v-model="key" @change="search" size="mini" placeholder="输入关键字搜索">
									<i slot="prefix" class="el-input__icon el-icon-search"></i>
								</el-input>
							</el-col>
							<el-col :span="4">
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
		<el-pagination small="" layout="total, sizes, prev, pager, next, jumper" :total="1000" @size-change="handleSizeChange"
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
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="company.icon" :src="company.icon" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="公司介绍" :label-width="formLabelWidth" prop="desc">
					<el-input type="textarea" :rows="7" v-model="company.desc"></el-input>
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
		name: 'CompanyShow',
		data() {
			return {
				allDel: false,
				del: false,
				dialogTableVisible: false,
				dialogFormVisible: false,
				delData: '',
				currentPage: 1,
				pageSize: 4,
				tableHeight: window.innerHeight - 250,
				tableData: '',
				key: '',
				imageUrl: '',
				company: {
					id: '',
					name: '',
					icon: '',
					desc: ''
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
					desc: [{
						required: true,
						message: '请填写公司介绍',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			// 编辑
			handleEdit(index, row) {
				this.company.id = row.id;
				this.company.name = row.name;
				this.company.desc = row.desc;
				this.company.icon = row.icon;
				this.dialogTableVisible = true;
				this.dialogFormVisible = true;
			},
			openDel(index, row) {
				this.del = true;
				this.delData = row.id;
			},
			// 删除
			handleDelete() {
				alert("单选删除");
				console.log(this.delData);
				this.delete(this.delDate);
				this.del = false;
			},
			deleteAll() {
				alert("全选删除");
				this.delete(this.multipleSelection);
				console.log(this.multipleSelection);
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
				this.imageUrl = URL.createObjectURL(file.raw);
				this.companyForm.resource = res;
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
					.post('/admin/company/show', {
						pageSize: this.pageSize,
						currentPage: this.currentPage
					})
					.then(resp => {
						if (resp.data.code === 200) {
							var data = resp.data.msg;
							this.tableData = data;
						}
					})
				alert(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.$axios
					.post('/admin/company/show', {
						pageSize: this.pageSize,
						currentPage: this.currentPage
					})
					.then(resp => {
						if (resp.data.code === 200) {
							var data = resp.data.msg;
							this.tableData = data;
						}
					})
				alert(`当前页: ${val}`);
			},
			delete(delDate) {
				//发送删除请求
				this.$axios
					.post('/admin/company/del', {
						companies: delDate
					})
					.then(resp => {
						if (resp.data.code === 200) {
							var data = resp.data.msg;
							this.tableData = data;
						}
					})
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.$message.error('删除出错');
			},
			//搜索表单信息
			search() {
				console.log(this.key);
				this.$axios
					.post('/admin/company/search', {
						key: this.key
					})
					.then(resp => {
						if (resp.data.code === 200) {
							var data = resp.data.msg;
							this.tableData = data;
						}
					})
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
								description: this.company.desc
							})
							.then(resp => {
								if (resp.data.code === 200) {
									var data = resp.data.msg;
									this.$message({
										message: '修改成功',
										type: 'success'
									});
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
