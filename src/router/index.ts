import { createRouter, createWebHistory } from 'vue-router'
import { setupAuthGuard } from './auth-guards'

const SignIn = () => import('../pages/auth/SignIn.vue')
const SignUp = () => import('../pages/auth/Signup.vue')
const OrganizationCreate = () => import('../pages/auth/OrganizationCreate.vue')
const ResetPassword = () => import('../pages/auth/ResetPassword.vue')
const Home = () => import('../pages/home/Home.vue')
const ListUser = () => import('../pages/accounts/ListUser.vue')
const CreateUser = () => import('../pages/accounts/CreateUser.vue')
const UpdateUser = () => import('../pages/accounts/UpdateUser.vue')

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/organization-create',
    name: 'OrganizationCreate',
    component: OrganizationCreate,
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/accounts/list',
    name: 'ListUser',
    component: ListUser,
    meta: { requiresAuth: true },
  },
  {
    path: '/accounts/create',
    name: 'CreateUser',
    component: CreateUser,
    meta: { requiresAuth: true },
  },
  {
    path: '/accounts/update/:id',
    name: 'UpdateUser',
    component: UpdateUser,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

setupAuthGuard(router)

export default router
