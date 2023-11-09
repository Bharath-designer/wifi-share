import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/Home"
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/send',
    name: 'Send',
    component: ()=>import("../views/Send.vue")
  },
  {
    path: '/receive',
    name: 'Receive',
    component: ()=>import("../views/Receive.vue")
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
