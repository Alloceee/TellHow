<template>
	<div id="result">
		<el-row>
			<el-col :span="24">
				<el-card shadow="never">
					飞机航班
				</el-card>
			</el-col>
		</el-row>
		<el-row class="infinite-list" v-infinite-scroll="load" style="overflow-y:scroll;height: 600px;">
			<el-col :key='i' :span="24" v-for="i in count" class="infinite-list-item">
				<el-card shadow="never">
					{{ i }}
					<el-button @click="addClock(i)" size="mini">添加提醒<i class="el-icon-alarm-clock"></i></el-button>
				</el-card>
			</el-col>
		</el-row>
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
		name: 'SearchResult',
		data() {
			return {
				count: 0,
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
		methods: {
			load() {
				this.count += 2
			},
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
							// } else {
							// 	this.$message.error("验证码发送错误，错误代码:" + resp.data.data.return_code);
							// }
						} else if (resp.data.code === 500) {
							this.$message.error(resp.data.msg);
						} else {
							this.$message.error("验证码发送错误");
						}
					})
			},
			addClock(plane) {
				this.dialogTableVisible = true;
				this.dialogFormVisible = true;
				this.clockForm.plane = plane;
			},
			submitForm(formName) {
				var data = {
					planeId: this.clockForm.plane,
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

<style>
</style>
