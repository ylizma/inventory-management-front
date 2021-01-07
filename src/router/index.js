import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/dashboard.vue';
import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    children:[
      {
        path: '/movements',
        name: 'stockmovements',
        component: () => import(/* webpackChunkName: "about" */ '../views/StockMovement.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/productgroup',
        name: 'productgroup',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductGroup.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/warehouse',
        name: 'warehouse',
        component: () => import(/* webpackChunkName: "about" */ '../views/Warehouse.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import(/* webpackChunkName: "about" */ '../views/Supplier.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/products',
        name: 'product',
        component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/users',
        name: 'user',
        component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
        meta: {
          requiresAuth: true
        }
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.logedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;
