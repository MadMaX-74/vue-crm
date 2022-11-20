/* eslint-disable */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import firebase from 'firebase/compat/app';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    // eslint-disable-next-line
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views//Home.vue')
  },
  {
    path: '/login',
    // eslint-disable-next-line
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categories',
    // eslint-disable-next-line
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/deatil',
    // eslint-disable-next-line
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/history',
    // eslint-disable-next-line
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    // eslint-disable-next-line
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    // eslint-disable-next-line
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    // eslint-disable-next-line
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record.vue')
  },
  {
    path: '/register',
    // eslint-disable-next-line
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next ) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
