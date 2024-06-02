import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Toast from 'vue-toastification';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Toast, {
  position: "top-right",
  timeout: 5000,
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  icon: true,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  rtl: false
});

const axiosInstance = axios.create({
  baseURL: 'http://localhost:80' 
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.status >= 201 && response.status < 300) {
      Vue.prototype.$toast.success(response.data.message || 'Request was successful');
    }
    return response;
  },
  error => {
    if (error.response && error.response.status >= 300) {
      Vue.prototype.$toast.error(error.response.data.message || 'An error occurred');
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axiosInstance;
export { axiosInstance };

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
