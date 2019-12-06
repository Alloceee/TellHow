<template>
	<div data-role="search" class="search-show">
		<div class="block">
			<ul class="nav nav-tabs nav-justified" data-toggle="tabs">
				<li class="active">
					<a href="#btabs-static-justified-home"><i class="fa fa-fighter-jet"></i>国内航班查询</a>
				</li>
				<li class="">
					<a href="#btabs-static-justified-profile"><i class="fa fa-fighter-jet"></i>国外航班查询</a>
				</li>
				<li class="">
					<a href="#btabs-static-justified-settings"><i class="fa fa-cog"></i>航班动态</a>
				</li>
			</ul>
			<div class="block-content tab-content">
				<div class="tab-pane active" id="btabs-static-justified-home">
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
												<input type="text" id="china_start" value="" name="startCity" placeholder="可输入城市或机场" class="form-control" />
											</div>
										</div>
										<div class="col-sm-2">
											<span class="fa fa-exchange btn btn-rounded change-btn" id="china_change"></span>
										</div>
										<div class="col-sm-5">
											<div class="form-material">
												<h5 class="font-w300 push">目的地</h5>
												<input type="text" id="china_end" value="" name="endCity" placeholder="可输入城市或机场" class="form-control" />
											</div>
										</div>

									</div>

								</div>
							</a>
						</div>
						<div class="col-sm-6">
							<a class="block block-link-hover3 search-box" href="javascript:void(0);">
								<div class="block-content">
									<div class="form-group">
										<label class="col-md-3 control-label" for="time">选择时间</label>
										<div class="col-md-7">
											<input type="text" class="form-control" id="time1" name="time" placeholder=" - ">
										</div>
									</div>
								</div>
							</a>
						</div>
						<div class="col-sm-12">
							<span class="btn btn-minw search-btn" type="button" id="china_search"><i class="fa fa-search">搜索</i></span>
						</div>
						<input type="hidden" name="type" value="0">
						<input type="hidden" name="userIp" data-role="user_ip">
					</form>
				</div>
				<div class="tab-pane" id="btabs-static-justified-profile">
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
												<input type="text" id="abroad_start" value="" name="startCity" placeholder="可输入城市或机场" class="form-control" />
											</div>
										</div>
										<div class="col-sm-2">
											<span class="fa fa-exchange btn btn-rounded change-btn" id="abroad_change"></span>
										</div>
										<div class="col-sm-5">

											<div class="form-material">
												<h5 class="font-w300 push">目的地</h5>
												<input type="text" id="abroad_end" value="" name="entCity" placeholder="可输入城市或机场" class="form-control" />
											</div>
										</div>

									</div>

								</div>
							</a>
						</div>
						<div class="col-sm-6">
							<a class="block block-link-hover3 search-box" href="javascript:void(0);">
								<div class="block-content">
									<div class="form-group">
										<label class="col-md-3 control-label" for="time">选择时间</label>
										<div class="col-md-7">
											<input type="text" class="form-control" id="time2" name="time" placeholder=" - ">
										</div>
									</div>
								</div>
							</a>
						</div>
						<div class="col-sm-12">
							<span class="btn btn-minw search-btn" type="button" id="abroad_search"><i class="fa fa-search">搜索</i></span>
						</div>
						<input type="hidden" name="userIp" data-role="user_ip">
						<input type="hidden" name="type" value="1">
					</form>
				</div>
				<div class="tab-pane" id="btabs-static-justified-settings"></div>
				<!-- <script id="news_show" type="text/html">
					<div class="row">
	            {{# layui.each( d, function(index, item){ }}
	            <div class="col-lg-4">
	                <a class="block block-link-hover3" href="javascript:void(0)">
	                    <div class="block-title">{{ item.title }}</div>
	                    <div class="block-content block-content-full clearfix">
	                       {{ item.content }}
	                    </div>
	                </a>
	            </div>
	            {{# }); }}
	            {{# if(d.length === 0){ }}
	            无数据
	            {{# } }}
	        </div>
	    </script> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Search'
	}
</script>

<style scoped="scoped">
	/* 搜索区域 */
	.search-show>.block {
		position: relative;
		min-height: 300px;
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
		z-index: 2;
	}
	
	.search-btn i {
		color: white;
	}
	
	.search-btn:hover {
		background-image: linear-gradient(-90deg, #FF8D16 0%, #FFB513 100%);
	}

</style>
