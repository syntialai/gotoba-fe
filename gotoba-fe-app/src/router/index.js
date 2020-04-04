import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import { Components, Pages } from './pages';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
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
    path: '/terms-and-condition',
    name: 'Terms and Condition',
    component: Pages.TERMS_AND_CONDITION,
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    component: Pages.PRIVACY_POLICY,
  },
  {
    path: '/edit-profile',
    name: 'Edit Profile',
    component: Pages.EDIT_PROFILE,
  },
  {
    path: '/history/:id',
    name: 'History',
    component: Pages.HISTORY,
    children: [
      {
        path: 'pending',
        component: Components.HISTORY_PENDING,
      },
      {
        path: 'cancelled',
        component: Components.HISTORY_CANCELLED,
      },
    ],
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Pages.NOTIFICATION,
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
