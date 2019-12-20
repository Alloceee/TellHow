<template>
	<div data-role="search" class="search-show">
		<el-tabs v-model="activeName" type="border-card" :stretch="true" class="block">
			<el-tab-pane label="国内航班查询" name="first">
				<form id="china_form" action="/search" method="post">
					<!--                    <div class="col-sm-12">-->
					<!--                        <label class="css-input css-radio css-radio-info push-10-r">-->
					<!--                            <input type="radio" name="china-type" checked=""><span></span>单程-->
					<!--                        </label>-->
					<!--                        <label class="css-input css-radio css-radio-info">-->
					<!--                            <input type="radio" name="china-type"><span></span>往返-->
					<!--                        </label>-->
					<!--                    </div>-->
					<div class="col-sm-6">
						<a class="block block-link-hover3 search-box" href="javascript:void(0)">
							<div class="block-content">
								<div class="row">
									<div class="col-sm-5">
										<div class="form-material">
											<h5 class="font-w300 push">出发地</h5>
											<RemoteSelect id="china_start" value="" name="startCity"></RemoteSelect>
										</div>
									</div>
									<div class="col-sm-2">
										<span class="fa fa-exchange btn btn-rounded change-btn" id="china_change"></span>
									</div>
									<div class="col-sm-5">
										<div class="form-material">
											<h5 class="font-w300 push">目的地</h5>
											<RemoteSelect id="china_end" value="" name="endCity"></RemoteSelect>
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
					<div class="col-sm-6">
						<a class="block block-link-hover3 search-box" href="javascript:void(0);">
							<div class="block-content">
								<DateTimePicker></DateTimePicker>
							</div>
						</a>
					</div>
					<div class="col-sm-12">
						<span class="btn btn-minw search-btn" type="button" id="china_search"><i class="fa fa-search">搜索</i></span>
					</div>
					<input type="hidden" name="type" value="0">
					<input type="hidden" name="userIp" data-role="user_ip">
				</form>
			</el-tab-pane>
			<el-tab-pane label="国外航班查询" name="second">
				<form id="abroad_form" onsubmit="return false">
					<!--                    <div class="col-sm-12">-->
					<!--                        <label class="css-input css-radio css-radio-info push-10-r">-->
					<!--                            <input type="radio" name="radio-group3" checked=""><span></span>单程-->
					<!--                        </label>-->
					<!--                        <label class="css-input css-radio css-radio-info">-->
					<!--                            <input type="radio" name="radio-group3"><span></span>往返-->
					<!--                        </label>-->
					<!--                    </div>-->
					<div class="col-sm-6">
						<a class="block block-link-hover3 search-box" href="javascript:void(0)">
							<div class="block-content">
								<div class="row">
									<div class="col-sm-5">
										<div class="form-material">
											<h5 class="font-w300 push">出发地</h5>
											<RemoteSelect id="abroad_start" value="" name="startCity"></RemoteSelect>
										</div>
									</div>
									<div class="col-sm-2">
										<span class="fa fa-exchange btn btn-rounded change-btn" id="abroad_change"></span>
									</div>
									<div class="col-sm-5">

										<div class="form-material">
											<h5 class="font-w300 push">目的地</h5>
											<RemoteSelect id="abroad_start" value="" name="startCity"></RemoteSelect>
										</div>
									</div>

								</div>

							</div>
						</a>
					</div>
					<div class="col-sm-6">
						<a class="block block-link-hover3 search-box" href="javascript:void(0);">
							<div class="block-content">
								<DateTimePicker></DateTimePicker>
							</div>
						</a>
					</div>
					<div class="col-sm-12">
						<span class="btn btn-minw search-btn" type="button" id="abroad_search"><i class="fa fa-search">搜索</i></span>
					</div>
					<input type="hidden" name="userIp" data-role="user_ip">
					<input type="hidden" name="type" value="1">
				</form>
			</el-tab-pane>
			<el-tab-pane label="航班动态" name="third">
				<InfinateList></InfinateList>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import DateTimePicker from '@/components/home/utils/DateTimePicker.vue'
	import RemoteSelect from '@/components/home/utils/RemoteSelect.vue'
	import InfinateList from '@/components/home/utils/InfinateList.vue'
	export default {
		name: 'Search',
		data() {
			return {
				activeName: 'first'
			};
		},
		components: {
			DateTimePicker,
			RemoteSelect,
			InfinateList
		},
	}
</script>

<style scoped="scoped">
	/* 搜索区域 */
	.el-tab-pane {
		overflow: auto;
		min-height: 260px;
	}

	.search-show>.block {
		position: relative;
		min-height: 290px;
	}

	.search-box {
		border-radius: 10px;
		padding: 10px;
		height: 150px;
	}

	.search-box .change-btn {
		display: block;
		outline: none;
		background: transparent;
		border: rgba(196, 196, 205, 0.81) 1px solid;
		margin-top: 50%;
	}

	.change-btn:hover {
		background: rgba(196, 196, 205, 0.81);
	}

	.search-btn {
		font-size: 18px;
		border: none;
		color: white;
		height: 56px;
		line-height: 50px;
		width: 176px;
		border-radius: 28px;
		border: none;
		background-color: #FF7700;
		box-shadow: 0 4px 16px 0 rgba(255, 102, 0, 0.32);
		background-image: linear-gradient(-90deg, #FF7700 0%, #FFA50A 100%);
		position: absolute;
		bottom: -58px;
		left: 50%;
		margin-left: -88px;
		z-index: 999;
	}

	.search-btn i {
		color: white;
	}

	.search-btn:hover {
		background-image: linear-gradient(-90deg, #FF8D16 0%, #FFB513 100%);
	}
</style>
