import Vue from 'vue'
import Router from 'vue-router'
import Swiper from '@/components/home/comm/Swiper'

Vue.use(Router)

export default new Router({
	mode:'hash',
	routes:[
		{
			path:'/swiper',
			name:'Swiper',
			components:Swiper
		}
	]
})