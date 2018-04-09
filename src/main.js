// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
//axios.defaults.withCredentials=true
axios.defaults.baseURL = 'http://localhost:3002';
// axios.defaults.baseURL = 'http://10.132.161.31:3002';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;
Vue.prototype.$excelPath_custom=axios.defaults.baseURL+'/download/';
Vue.config.productionTip = true

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
