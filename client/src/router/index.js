import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import('../views/Room.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/rooms/create',
    name: 'createRoom',
    component: () => import('../views/CreateRoom.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/rooms',
    name: 'JoinRoom',
    component: () => import('../views/JoinRoom.vue'),
    meta:{
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
