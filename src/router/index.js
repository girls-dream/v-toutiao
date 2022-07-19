import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/ ',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home'),
        name:'home'
      },
      {
        path: '/qa',
        component: () => import('@/views/QA'),
        name:'qa'
      },
      {
        path: '/profile',
        component: () => import('@/views/My'),
        name:'my'
      },
      {
        path: '/video',
        component: () => import('@/views/Video'),
        name:'video'
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
