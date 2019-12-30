<template>
	<div>
		<el-page-header @back="goBack" content="添加客机信息"></el-page-header>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form :model="plane" :rules="rules" ref="plane" label-width="100px" class="demo-ruleForm">
					<el-form-item label="所属公司" prop="companyId">
						 <el-select v-model="plane.companyId" filterable placeholder="请选择">
						    <el-option
						      v-for="item in plane.company"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
					</el-form-item>
					<el-form-item label="客机机型" prop="model">
						<el-input v-model="plane.model"></el-input>
					</el-form-item>
					<el-form-item label="客机序号" prop="number">
						<el-input v-model="plane.number"></el-input>
					</el-form-item>
					<el-form-item label="客机型号" prop="type">
						<el-radio-group v-model="plane.type">
							<el-radio :label="0">小型</el-radio>
							<el-radio :label="1">中型</el-radio>
							<el-radio :label="2">大型</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button @click="fileUpload">
							<i class="el-icon-folder-add"></i>
						</el-button>
						<el-button type="primary" @click="submitForm('plane')">添 加</el-button>
						<el-button @click="resetForm('plane')">重 置</el-button>
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
	export default {
		name: 'PlaneAdd',
		created() {
			this.$axios
				.get('/admin/company/all')
				.then(resp => {
					this.plane.company = resp.data.data
				})
		},
		data() {
			return {
				imageUrl: '',
				plane: {
					model: '',
					number: '',
					company: '',
					type: 1,
					companyId: ''
				},
				fileForm: false,
				fileList: '',
				rules: {
					companyId: [{
						required: true,
						message: '请选择所属公司',
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: '请填写客机机型'
					}],
					number: [{
						required: true,
						message: '请填写客机序号',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择客机型号',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios
							.post('/admin/plane/add', {
								model: this.plane.model,
								number: this.plane.number,
								type: this.plane.type,
								companyId: this.plane.companyId
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
										path: path === '/admin/plane/add' || path === undefined ? '/admin/plane/show' : path
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
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.plane.resource = res;
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
			fileUpload() {
				this.fileForm = true;
			},
			handleChange(file, fileList) {
				const isExcel = file.type === ('xls') || ('xlsx');
				this.fileList = fileList.slice(-3);
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
