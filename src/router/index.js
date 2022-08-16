import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: App,
    meta: {
      forVisitors: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
