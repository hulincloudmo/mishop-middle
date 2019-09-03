import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'
import config from './common/config/config.js'
import eCharts from 'echarts'

Vue.prototype.qs = qs;
Vue.prototype.axios = axios;
Vue.prototype.serverUrl = "http://127.0.0.1:8081";
Vue.config.productionTip = false;
Vue.prototype.$conf = config;
Vue.prototype.$eCharts = eCharts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
