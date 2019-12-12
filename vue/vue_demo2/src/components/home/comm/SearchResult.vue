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
					<i @click="addClock(i)" class="el-icon-alarm-clock"></i>
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
				console.log(this.clockForm.email);
				//发送验证码
				this.send.sendType = "success";
				this.send.sendStatus = "disabled";
				this.send.sendMessage = "l";
			},
			addClock(plane) {
				console.log(plane)
				this.dialogTableVisible = true;
				this.dialogFormVisible = true;
				this.clockForm.plane = plane;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this[formName]);
						//提交表单

						//添加成功
						this.closeForm(formName);
					} else {
						return false;
					}
				})
			},
			closeForm(formName) {
				this.dialogFormVisible = false;
				this.send.sendType = "";
				this.send.sendStatus = false;
				this.send.sendMessage = "发送验证码";
			}

		}
	}
</script>

<style>
</style>
