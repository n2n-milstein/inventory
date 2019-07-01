import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.config.productionTip = false;

let app: any = "";
const firebaseConfig = {
  apiKey: "AIzaSyAG4FPlVFT20lLKjErXY2LH0AICB070gsI",
  authDomain: "neighbor-to-neighbor-da5ce.firebaseapp.com",
  databaseURL: "https://neighbor-to-neighbor-da5ce.firebaseio.com",
  projectId: "neighbor-to-neighbor-da5ce",
  storageBucket: "neighbor-to-neighbor-da5ce.appspot.com",
  messagingSenderId: "682085165",
  appId: "1:682085165:web:8168de7754befe55"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
