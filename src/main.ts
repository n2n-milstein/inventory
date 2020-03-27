import Vue from "vue";
// router
import router from "./router";
// vuetify
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
// vuex
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
