import Vue from "vue";
// firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// router
import router from "./router";
// vuetify
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
// vuex
import store from "./store";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAG4FPlVFT20lLKjErXY2LH0AICB070gsI",
  authDomain: "neighbor-to-neighbor-da5ce.firebaseapp.com",
  databaseURL: "https://neighbor-to-neighbor-da5ce.firebaseio.com",
  projectId: "neighbor-to-neighbor-da5ce",
  storageBucket: "neighbor-to-neighbor-da5ce.appspot.com",
  messagingSenderId: "682085165",
  appId: "1:682085165:web:8168de7754befe55",
};
// for reference: https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public#37484053

firebase.initializeApp(firebaseConfig);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
