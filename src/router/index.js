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
    name: "home",
    title: "CODE DUEL",
    component: HomePage,
  },
  {
    path: "/field",
    name: "field",
    title: "CODE DUEL",
    component: FieldPage,
  },
  {
    path: "/cpu",
    name: "cpu",
    title: "CODE DUEL",
    component: CPUPage,
  },
  {
    path: "/waitingroom",
    name: "waitingroom",
    title: "CODE DUEL",
    component: WaitingRoom
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
