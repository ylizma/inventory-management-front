import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/index.css'
import 'vue-awesome/icons'
import Axios from 'axios';

const axios = Axios.create({ baseURL: 'http://localhost:8080/stock-api' });

Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
