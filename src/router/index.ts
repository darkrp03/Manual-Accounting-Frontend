import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
    try {
      const response = await fetch(import.meta.env.VITE_LOGIN_STATUS, { credentials: 'include' });

      if ((to.name !== 'login' && to.name !== 'register') && response.status == 401) {
        return next('/login');
      }

      if ((to.name === 'login' || to.name === 'register') && response.status == 200) {
        return next('/');
      }

      next();
    } catch (err) {
      console.log(err);
    }
  }
);

export default router