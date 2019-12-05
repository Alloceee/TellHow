import Vue from 'vue'
import App from './App.vue'
/*引入公共样式*/
import '@/assets/css/oneui.css'
import '@/assets/css/style.css'
import '@/assets/js/jquery.min.js'
import '@/assets/js/bootstrap.min.js'
import '@/assets/plugins/slick/slick.min.js'
import '@/assets/js/jquery.scrollLock.min.js'
import '@/assets/js/jquery.appear.min.js'
import '@/assets/js/jquery.countTo.min.js'
import '@/assets/js/jquery.placeholder.min.js'
import '@/assets/js/js.cookie.min.js'
import '@/assets/js/jquery.slimscroll.min.js'
import '@/assets/js/app.js'
import '@/assets/plugins/layui/layui.js'
import '@/assets/base/base_index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
