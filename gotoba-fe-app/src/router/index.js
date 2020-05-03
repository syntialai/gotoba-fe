import Vue from 'vue';
import VueRouter from 'vue-router';
import { Components, Pages, Admin } from './pages';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: '',
  //   meta: {
  //     layout: '',
  //   },
  // },
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
  {
    path: '/cart',
    name: 'Cart',
    component: Pages.CART,
  },
  {
    path: '/login',
    name: 'Login',
    component: Pages.LOGIN,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: Pages.SIGN_UP,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/terms-and-condition',
    name: 'Terms and Condition',
    component: Pages.TERMS_AND_CONDITION,
    meta: {
      layout: 'details',
    },
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    component: Pages.PRIVACY_POLICY,
    meta: {
      layout: 'details',
    },
  },
  {
    path: '/edit-profile',
    name: 'Edit Profile',
    component: Pages.EDIT_PROFILE,
    meta: {
      layout: 'details',
    },
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
    meta: {
      layout: 'details',
    },
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
    meta: {
      layout: 'details',
    },
  },
  {
    path: '/faq/payment/transfer',
    name: 'Payment Guide',
    component: Pages.PAYMENT_GUIDE,
    meta: {
      layout: 'details',
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: Pages.SEARCH,
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: Admin.USER_DATA,
    children: [
      {
        path: 'user',
        component: Admin.USER_DATA,
      },
    ],
    meta: {
      layout: 'admin',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
