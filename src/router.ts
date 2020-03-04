import Vue from "vue";
import Router from "vue-router";
import * as firebase from "firebase/app";
import Login from "./views/Login.vue";
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
      beforeEnter(to, from, next): void {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            next("/home");
          } else {
            next();
          }
        });
      },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue"),
      redirect: { name: "hello" },
      beforeEnter(to, from, next): void {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            next();
          } else {
            next("/");
          }
        });
      },
      // TODO: this is where most of the routes should be added
      children: [
        {
          path: "/inventory",
          name: "inventory",
          component: () => import("./views/Inventory.vue"),
        },
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/About.vue"),
        },
        {
          path: "/pending",
          name: "pending",
          component: () => import("./views/Pending.vue"),
        },
        {
          path: "/hello",
          name: "hello",
          component: () => import("./views/Hello.vue"),
        },
        {
          path: "/rejected",
          name: "rejected",
          component: () => import("./views/Rejected.vue"),
        },
        {
          path: "/feedback",
          name: "feedback",
          component: () => import("./views/Feedback.vue"),
        },
        // TODO: delete this admin view when deploying
        {
          path: "/admin",
          name: "admin",
          component: () => import("./views/Admin.vue"),
        },
      ],
    },
  ],
});

export default router;
