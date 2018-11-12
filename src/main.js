import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from 'axios';
Axios.defaults.baseURL = process.env.VUE_APP_API_URL;

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import moment from 'moment'
Vue.prototype.moment = moment

//Custom components Registration
import Spinner from './components/partials/spinner.vue'
Vue.component('spinner', Spinner);

//Vendors
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/scss/font-awesome.scss'
import 'toastr/toastr.scss'

import './assets/scss/app.scss';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
