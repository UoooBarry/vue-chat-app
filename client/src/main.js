import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import useUsers from '@/store/auth';
import ErrorMessage from '@/components/layouts/ErrorMessage';

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

const app = createApp(App);
app.use(router);
app.component('ErrorMessage', ErrorMessage); //register component
app.mount('#app');



app.provide('SERVER_URL', process.env.VUE_APP_SERVER_URL);