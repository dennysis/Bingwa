import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import UserLogin from '../components/UserLogin.vue'
import UserSignup from '../components/UserSignup.vue'
import Dashboard from '../components/Dashboard.vue'
import CustomerList from '../components/CustomerList.vue'
import CustomerForm from '../components/CustomerForm.vue'
import UserList from '../components/UserList.vue'
import UserForm from '../components/UserForm.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: UserSignup
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers',
    name: 'Customers',
    component: CustomerList,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers/new',
    name: 'NewCustomer',
    component: CustomerForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers/:id/edit',
    name: 'EditCustomer',
    component: CustomerForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: UserList,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/new',
    name: 'NewUser',
    component: UserForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id/edit',
    name: 'EditUser',
    component: UserForm,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
