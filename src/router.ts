import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      beforeEnter(to, from, next) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            next("/home");
          } else {
            next();
          }
        });
      }
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue"),
      redirect: { name: "hello" },
      beforeEnter(to, from, next) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            next();
          } else {
            next("/");
          }
        });
      },
      children: [
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
          path: "/approval",
          name: "approval",
          component: () => import("./views/Approval.vue")
        },
        {
          path: "/hello",
          name: "hello",
          component: () => import("./views/Hello.vue")
        }
      ]
    }
  ]
});

export default router;
