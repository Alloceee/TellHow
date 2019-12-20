<template>
	<el-row class="tac" style="min-height: 100%;">
		<el-col :span="20">
			<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
			 text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="1">
					<span slot="title">
						<el-link href="/admin" :underline="false" class="header-title">后台管理</el-link>
					</span>
				</el-menu-item>
				<el-menu-item index="2">
					<span slot="title">
						航班信息管理
					</span>
				</el-menu-item>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>航班管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/fight/add" :underline="false">
								上传信息
							</el-link>
						</el-menu-item>
						<el-menu-item index="1-1">
							<el-link href="/admin/fight/china" :underline="false">
								查看国内航班
							</el-link>
						</el-menu-item>
						<el-menu-item index="1-1">
							<el-link href="/admin/fight/abroad" :underline="false">
								查看国外航班
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>航班公司管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/company/add" :underline="false">
								添加公司
							</el-link>
						</el-menu-item>
						<el-menu-item index="1-1">
							<el-link href="/admin/company/show" :underline="false">
								查看公司
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>航班客机管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/plane/add" :underline="false">
								添加客机
							</el-link>
						</el-menu-item>
						<el-menu-item index="1-1">
							<el-link href="/admin/plane/show" :underline="false">
								查看客机
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>航班动态管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/news/add" :underline="false">
								上传动态
							</el-link>
						</el-menu-item>
						<el-menu-item index="1-1">
							<el-link href="/admin/news/show" :underline="false">
								查看动态
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="3">
					<span slot="title">
						其他功能管理
					</span>
				</el-menu-item>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>提醒管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin" :underline="false">
								查看提醒用户
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>城市管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/hot/show" :underline="false">
								上传城市
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/hot/show" :underline="false">
								管理城市
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/hot/show" :underline="false">
								查看热门城市
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="7">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>定时器管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/task/show" :underline="false">
								查看定时器
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="4">
					<span slot="title">
						日志管理
					</span>
				</el-menu-item>
				<el-submenu index="8">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>日志管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<el-link href="/admin/log/sql" :underline="false">
								数据库日志
							</el-link>
						</el-menu-item>
						<el-menu-item index="1-1">
							<el-link href="/admin/log/error" :underline="false">
								错误日志
							</el-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'NavMenu',
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped="scoped">
	.el-link {
		color: white;
	}

	.header-title {
		display: block;
		font-size: 30px;
		text-align: center;
	}
</style>
