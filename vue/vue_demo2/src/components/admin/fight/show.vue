<template>
	<div>
		<el-card shadow="never">
			<el-table :data="tableData" :height="tableHeight" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="客机序号">
								<span>{{ props.row.planeId }}</span>
							</el-form-item>
							<el-form-item label="客机类型">
								<span>{{ props.row.notify_content }}</span>
							</el-form-item>
							<el-form-item label="起飞机场">
								<span>{{ props.row.startAirport }}</span>
							</el-form-item>
							<el-form-item label="降落机场">
								<span>{{ props.row.endAirport }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="起飞地" prop="startCity">
				</el-table-column>
				<el-table-column label="目的地" prop="endCity">
				</el-table-column>
				<el-table-column label="起飞时间" prop="startTime">
				</el-table-column>
				<el-table-column label="降落时间"  prop="endTime">
				</el-table-column>
				<el-table-column label="价格"  prop="price">
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
		<el-dialog title="修改航班信息" :visible.sync="dialogFormVisible">
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
		name: 'FightShow',
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
				fight: {
				
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
			this.initDate("/admin/chinaFight/all");
		},
		methods: {
			initDate(url) {
				this.$axios
					.post(url, {
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
				this.fight.startCity = row.startCity;
				this.fight.endCity = row.endCity;
				this.fight.startTime = [row.planStartTime,row.planEndTime];
				this.fight.startAirport = row.startAirport;
				this.fight.endAirport = row.endAirport;
				this.fight.price = row.price;
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
