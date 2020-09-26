import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/dashboard.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children:[
      {
        path: '/movements',
        name: 'stockmovements',
        component: () => import(/* webpackChunkName: "about" */ '../views/StockMovement.vue')
      },
      {
        path: '/productgroup',
        name: 'productgroup',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductGroup.vue')
      },
      {
        path: '/warehouse',
        name: 'warehouse',
        component: () => import(/* webpackChunkName: "about" */ '../views/Warehouse.vue')
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
