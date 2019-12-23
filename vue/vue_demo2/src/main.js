import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
/*引入公共样式*/
import '@/assets/css/oneui.css'
import '@/assets/css/style.css'
import $ from '@/assets/js/jquery.min.js'
import '@/assets/js/bootstrap.min.js'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 使请求带上凭证信息
axios.defaults.withCredentials = false

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
