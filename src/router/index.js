import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/dashboard.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
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
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import(/* webpackChunkName: "about" */ '../views/Supplier.vue')
      },
      {
        path: '/products',
        name: 'product',
        component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue')
      }
    ],
  },
  {
    name:'Login',
    path:'/login',
    component:()=>import('../views/Login.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
