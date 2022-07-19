import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vant/lib/index.css";

// 加载全局样式
import "./styles/index.css";

import "amfe-flexible";
import Vant from "vant";
Vue.use(Vant);
import dayjs from 'dayjs'
console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
