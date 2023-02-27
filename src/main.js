import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Toasted from "vue-toasted";
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Toasted);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
