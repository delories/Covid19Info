import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/provienceMap/:name',
    name:'provience',
    component:CityView
  }
]

const router = new VueRouter({
  mode:'hash',
  routes
})

export default router
