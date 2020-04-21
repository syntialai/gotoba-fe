import Vue from 'vue';
import VueRouter from 'vue-router';
import PrivacyPolicy from '../views/User/PrivacyPolicy.vue';
import { Components, Pages } from './pages';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PrivacyPolicy,
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
    path: '/history/',
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
  {
    path: '/notification/:title',
    name: 'Notification Detail',
    component: Pages.NOTIFICATION_DETAIL,
    props: true,
  },
  {
    path: '/faq/payment/transfer',
    name: 'Payment Guide',
    component: Pages.PAYMENT_GUIDE,
  },
  {
    path: '/search',
    name: 'Search',
    component: Pages.SEARCH,
  },
  {
    path: '/my-tickets/',
    name: 'My Tickets',
    component: Pages.MY_TICKETS,
    children: [
      {
        path: 'expired',
        component: Components.TICKET_EXPIRED,
      },
    ],
  },
  // {
  //   path: '/itinerary',
  //   name: 'Itinerary',
  //   component: ITINERARY,
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
