import Vue from "vue";
import App from "../src/apps/App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import http from "./axios"; // 追加
import store from './store'
import titleMixin from './utils/title.js'

Vue.config.productionTip = false;
Vue.mixin(titleMixin)
Vue.prototype.$axios = http;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
