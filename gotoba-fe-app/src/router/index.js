import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Pages from './pages';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Pages.LOGIN,
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: Pages.SIGN_UP,
  },
  {
    path: '/about',
    name: 'About',
    component: Pages.ABOUT,
  },
  // {
  //   path: '/itinerary',
  //   name: 'Itinerary',
  //   component: ITINERARY,
  // },
  // {
  //   path: '/ticket',
  //   name: 'My Ticket',
  //   component: MY_TICKET,
  // },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: CART,
  // },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: PROFILE,
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
