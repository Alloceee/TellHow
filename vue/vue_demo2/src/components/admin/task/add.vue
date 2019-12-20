<template>
	<div>
		<el-page-header @back="goBack" content="添加航空公司"></el-page-header>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form :model="companyForm" :rules="rules" ref="companyForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="公司名称" prop="name">
						<el-input v-model="companyForm.name"></el-input>
					</el-form-item>
					<el-form-item label="公司图标" prop="icon">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
						 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="公司介绍" prop="desc">
						<el-input type="textarea" v-model="companyForm.desc"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="fileUpload">
							<i class="el-icon-folder-add"></i>
						</el-button>
						<el-button type="primary" @click="submitForm('companyForm')">添 加</el-button>
						<el-button @click="resetForm('companyForm')">重 置</el-button>
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
		name: 'CompanyAdd',
		data() {
			return {
				imageUrl: '',
				companyForm: {
					name: '',
					icon: '',
					desc: ''
				},
				fileForm: false,
				fileList: '',
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
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						alert('error submit!!');
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
