<template>
	<div>
		<el-divider content-position="left">国内航班</el-divider>
		<el-card shadow="never">
			<el-row :gutter="12">
				<el-col :span="8" v-for="plane in this.chinaPlane">
					<el-popover placement="right" width="430" trigger="click">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-col>起飞机场：{{ plane.startAirport }}</el-col>
								<el-col>降落机场：{{ plane.endAirport }}</el-col>
								<el-col>客机机型：{{ plane.model }}</el-col>
								<el-col v-if="plane.type===0">客机型号：小型</el-col>
								<el-col v-else-if="plane.type===1">客机型号：中型</el-col>
								<el-col v-else-if="plane.type===2">客机型号：大型</el-col>
								<el-col>客机序号：{{ plane.number }}</el-col>
							</el-col>
							<el-col :span="12">
								<el-col>
									<h3>{{ plane.name }}</h3><img :src="plane.icon">
								</el-col>
								<el-button @click="addClock(plane.id)" size="mini">添加提醒<i class="el-icon-alarm-clock"></i></el-button>
							</el-col>
						</el-row>
						<el-card shadow="hover" slot="reference">
							<el-row :gutter="20">
								<el-col>{{ plane.startCity }} <i class="el-icon-sort"></i> {{ plane.endCity }}</el-col>
								<el-col>{{ plane.startTime }}</el-col>
								<el-col>
									<h4 style="color: indianred;float: right;">{{ plane.price }} ￥</h4>
								</el-col>
							</el-row>
						</el-card>
					</el-popover>
				</el-col>
			</el-row>
		</el-card>
		<el-dialog title="添加邮箱提醒" :visible.sync="dialogFormVisible">
			<el-form :model="clockForm" :rules="rules" ref="clockForm">
				<el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
					<el-row :gutter="20">
						<el-col :span="10">
							<el-input v-model="clockForm.email" autocomplete="off"></el-input>
						</el-col>
						<el-col :span="10">
							<el-button :type="send.sendType" :model="send" :disabled="send.sendStatus" @click="sendCode" :key="send.sendMessage">
								{{ send.sendMessage }}
							</el-button>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
					<el-row :gutter="20">
						<el-col :span="10">
							<el-input v-model="clockForm.code" autocomplete="off"></el-input>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeForm('clockForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('clockForm')">添 加</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'ChinaPlane',
		data() {
			return {
				gridData: '',
				chinaPlane: '',
				dialogTableVisible: false,
				dialogFormVisible: false,
				send: {
					sendType: '',
					sendStatus: false,
					sendMessage: '发送验证码',
				},
				clockForm: {
					email: '',
					code: '',
					plane: ''
				},
				rules: {
					email: [{
						required: true,
						message: '请输入邮箱地址',
						trigger: ['blur', 'change']
					}, {
						type: 'email',
						message: '请输入正确的邮箱地址',
						trigger: ['blur', 'change']
					}],
					code: [{
						required: true,
						message: '请填写验证码'
					}]
				},
				formLabelWidth: '120px'
			};
		},
		created() {
			var _this = this;
			this.$axios
				.post('/china_plane', {
					currentPage: 1,
					pageSize: 9,
					startCity: "武汉",
					endCity: "深圳",
					orderByField: 'start_time'
				})
				.then(resp => {
					if (resp.data.code === 200) {
						_this.chinaPlane = resp.data.data.records;
						console.log(resp.data.data.records);
					}
				})
				.catch(failResponse => {})
		},
		methods: {
			sendCode() {
				//发送验证码
				this.$axios
					.post('/send', {
						email: this.clockForm.email,
						type: 0
					})
					.then(resp => {
						if (resp.data.code === 200) {
							// if (resp.data.data.return_code == "00000") {
								this.$message({
									type: 'success',
									message: '验证码发送成功，请注意接收'
								})
								this.send.sendType = "success";
								this.send.sendStatus = "disabled";
								this.setInterval();
							// }else{
							// 	this.$message.error("验证码发送错误，错误代码:"+resp.data.data.return_code);
							// }
						} else if (resp.data.code === 500) {
							this.$message.error(resp.data.msg);
						} else {
							this.$message.error("验证码发送错误");
						}
					})
			},
			addClock(plane) {
				console.log(plane)
				this.dialogTableVisible = true;
				this.dialogFormVisible = true;
				this.clockForm.plane = plane;
			},
			submitForm(formName) {
				var data = {
					id: this.clockForm.plane,
					phone: this.clockForm.phone,
					email: this.clockForm.email,
					code: this.clockForm.code
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						//提交表单
						this.$axios
							.post('/clock', JSON.stringify(data))
							.then(resp => {
								if (resp.data.code === 200) {
									this.$message({
										type: 'success',
										message: resp.data.msg
									})
								} else {
									this.$message.error("发生错误，请联系管理员");
								}
							})
						//添加成功
						this.closeForm(formName);
					} else {
						return false;
					}
				})
			},
			closeForm(formName) {
				clearInterval(this.interval);
				this.dialogFormVisible = false;
				this.send.sendType = "";
				this.send.sendStatus = false;
				this.send.sendMessage = "发送验证码";
			},
			setInterval(){
				var time = 60;
				 this.interval = setInterval(() => {
					this.send.sendMessage = time;
					time-=1;
					if(time===-1){
					  clearInterval(this.interval);
					  this.send.sendType = "";
					  this.send.sendStatus = false;
					  this.send.sendMessage = "重新发送验证码";
					}
				},1000)
			}
		}
	}
</script>

<style scoped="scoped">
	.el-col {
		margin: 5px 0;
	}

	.el-card {
		cursor: pointer;
	}

	img {
		width: 150px;
	}
</style>
