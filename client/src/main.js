import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import useUsers from '@/store/auth';

const {is_logged_in} = useUsers();

// Make a router check, required logged in when meta has requiresAuth
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!is_logged_in.value) {
        next({
          path: "/login",
        });
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
});

createApp(App)
.use(router)
.mount('#app')
