import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/components/HomeView.vue";
import MessagesView from "@/components/MessagesView.vue";
import AuthenticateLogin from "@/components/AuthenticateLogin.vue";
import AuthenticateSignup from "@/components/AuthenticateSignup.vue";
import ProfileView from "@/components/ProfileView.vue";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/messages",
      name: "MessagesView",
      component: MessagesView,
    },
    {
      path: "/login",
      name: "AuthenticateLogin",
      component: AuthenticateLogin,
    },
    {
      path: "/signup",
      name: "AuthenticateSignup",
      component: AuthenticateSignup,
    },
    {
      path: "/profile",
      name: "ProfileView",
      component: ProfileView,
    },
  ],
});
