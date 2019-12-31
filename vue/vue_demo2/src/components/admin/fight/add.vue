<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form :model="fight" :rules="rules" ref="fight" label-width="100px" class="demo-ruleForm">
					<el-form-item label="所属客机" prop="planeId">
						 <el-select v-model="fight.planeId" filterable placeholder="请选择">
						    <el-option
						      v-for="item in fight.plane"
						      :key="item.id"
						      :label="item.number"
						      :value="item.id">
							    <span style="float: left">{{ item.number }}</span>
							    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.model }}</span>
						    </el-option>
						  </el-select>
					</el-form-item>
					<el-form-item label="目的地" prop="endCity">
						<el-input v-model="fight.endCity"></el-input>
					</el-form-item>
					<el-form-item label="始发地" prop="startCity">
						<el-input v-model="fight.startCity"></el-input>
					</el-form-item>
					<el-form-item label="起飞抵达时间" prop="content">
						<DateTimePicker ref="time"></DateTimePicker>
					</el-form-item>
					<el-form-item label="起飞机场" prop="startAirport">
						<el-input v-model="fight.startAirport"></el-input>
					</el-form-item>
					<el-form-item label="目的机场" prop="endAirport">
						<el-input v-model="fight.endAirport"></el-input>
					</el-form-item>
					<el-form-item label="价格" prop="price">
						<el-input v-model="fight.price"></el-input>
					</el-form-item>
					<el-form-item label="航班类型" prop="type">
						 <el-radio v-model="fight.type" label="china">国内航班</el-radio>
						  <el-radio v-model="fight.type" label="abroad">国外航班</el-radio>
					</el-form-item>
					<el-form-item>
						<el-button-group>
						<el-button @click="fileUpload">
							<i class="el-icon-folder-add"></i>
						</el-button>
						<el-button type="primary" @click="submitForm('fight')">添 加</el-button>
						<el-button @click="resetForm('fight')">重 置</el-button>
						</el-button-group>
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
		name: 'FightAdd',
		components: {
			DateTimePicker
		},
		created() {
		this.$axios
			.get('/admin/plane/all')
			.then(resp => {
				this.fight.plane = resp.data.data
			})
		},
		data() {
			return {
				imageUrl: '',
				fight: {
					type: "china",
					plane:''
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
			};
		},
		methods: {
			submitForm(formName) {
				var data = {
					planeId: this.fight.planeId,
					startCity: this.fight.startCity,
					endCity: this.fight.endCity,
					startTime: this.$refs.time.time[0],
					endTime: this.$refs.time.time[1],
					startAirport: this.fight.startAirport,
					endAirport: this.fight.endAirport,
					price: this.fight.price,
				};
				console.log(data);
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios
							.post('/admin/'+this.fight.type+'Fight/add',data)
							.then(resp => {
								if (resp.data.code === 200) {
									var data = resp.data.msg;
									this.$message({
										message: data,
										type: 'success'
									});
									var path = this.$route.query.redirect
									this.$router.replace({
										path: path === '/admin/fight/add' || path === undefined ? '/admin/fight/show' : path
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
