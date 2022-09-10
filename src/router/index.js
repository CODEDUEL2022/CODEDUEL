import Vue from "vue";
import VueRouter from "vue-router";
import App from "../apps/App.vue";
import CPUPage from "../apps/pages/CPUPage.vue";
import HomePage from "../apps/pages/HomePage.vue";
import FieldPage from "../apps/pages/FieldPage.vue";
import WaitingRoom from "../apps/pages/WaitingRoom.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/field",
    name: "FieldPage",
    component: FieldPage,
  },
  {
    path: "/cpu",
    name: "CPUPage",
    component: CPUPage,
  },
  {
    path: "/waitingroom",
    name: "WaitingRoom",
    component: WaitingRoom,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
