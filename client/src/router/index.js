import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

// Import components
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';
import TodoList from '@/components/todos/TodoList.vue';

/**
 * Router configuration for Vue.js application
 * Handles authentication guards and route definitions
 */
const routes = [
  {
    path: '/',
    redirect: '/todos',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: '/todos',
    name: 'TodoList',
    component: TodoList,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/todos',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Navigation guard to protect routes based on authentication status
 */
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, checkAuth } = useAuth();

  // For authenticated routes, check auth status
  if (to.meta.requiresAuth) {
    if (!isAuthenticated.value) {
      // Try to check auth status first
      await checkAuth();
      if (!isAuthenticated.value) {
        next('/login');
        return;
      }
    }
  }

  // For guest routes, redirect if already authenticated
  if (to.meta.requiresGuest && isAuthenticated.value) {
    next('/todos');
    return;
  }

  next();
});

export default router;
