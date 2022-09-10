import Vue from "vue";
import App from "../src/apps/App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import http from "./axios"; // 追加
import VueTour from "vue-tour";
import "vue-tour/dist/vue-tour.css";

Vue.config.productionTip = false;
Vue.prototype.$axios = http;
Vue.use(VueTour);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
