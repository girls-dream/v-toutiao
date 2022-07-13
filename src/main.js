import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

// 加载全局样式
import "./styles/index.css";

import "amfe-flexible";

import { Button } from "vant";

Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
