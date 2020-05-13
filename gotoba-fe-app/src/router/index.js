import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/User/Main.vue';
import Home from '../views/User/Home/Home.vue';
import { Components, Pages, Admin } from './pages';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: '/itinerary',
        name: 'Itinerary',
        component: Pages.ITINERARY,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: '/my-tickets',
        name: 'My Tickets',
        component: Pages.MY_TICKETS,
        children: [
          {
            path: '',
            component: Components.TICKET_VALID,
          },
          {
            path: 'expired',
            component: Components.TICKET_EXPIRED,
          },
        ],
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Pages.CART,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Pages.PROFILE,
        meta: {
          layout: 'background-blue',
        },
      },
    ],
    meta: {
      layout: 'background-blue',
    },
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
    path: '/notification',
    name: 'Notification',
    component: Pages.NOTIFICATION,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/notification/:title',
    name: 'Notification Detail',
    component: Pages.NOTIFICATION_DETAIL,
    props: true,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: Pages.SEARCH,
  },
  {
    path: '/restaurant/:sku',
    name: 'Restaurant',
    component: Pages.RESTAURANT_PROFILE,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/restaurant/:sku/review',
    name: 'Restaurant Review',
    component: Pages.RESTAURANT_REVIEW,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/journey/:sku',
    name: 'Journey',
    component: Pages.JOURNEY_PROFILE,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/journey/:sku/review',
    name: 'Journey Review',
    component: Pages.JOURNEY_REVIEW,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/promotion/:sku',
    name: 'Promotion Detail',
    component: Pages.PROMOTION_DETAIL,
    meta: {
      layout: 'default-back',
    },
  },
  // {
  //   path: '/gallery',
  //   name: 'Gallery',
  //   component: Pages.GALLERY,
  //   meta: {
  //     layout: 'default-back',
  //   },
  // },
  // {
  //   path: '/itinerary/add',
  //   name: 'Add Itinerary',
  //   component: Pages.ITINERARY_ADD,
  //   meta: {
  //     layout: 'default-back',
  //   },
  // },
  // {
  //   path: '/my-tickets/:sku',
  //   name: 'QR Code Ticket',
  //   component: Pages.SHOW_QR_CODE,
  // },
  {
    path: '/payment/:sku',
    name: 'Payment',
    component: Pages.PAYMENT,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/order/thankyou/:sku',
    name: 'Payment Order',
    component: Pages.PAYMENT_ORDER,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/profile/edit',
    name: 'Edit Profile',
    component: Pages.EDIT_PROFILE,
    meta: {
      layout: 'default-back',
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
      layout: 'default-back',
    },
  },
  {
    path: '/terms-and-condition',
    name: 'Terms and Condition',
    component: Pages.TERMS_AND_CONDITION,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    component: Pages.PRIVACY_POLICY,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/faq/payment/transfer',
    name: 'Payment Guide',
    component: Pages.PAYMENT_GUIDE,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin.ADMIN_VIEW,
    children: [
      {
        path: 'user',
        name: 'User',
        component: Admin.USER_DATA,
      },
      {
        path: 'merchant',
        name: 'Merchant',
        component: Admin.MERCHANT_DATA,
      },
      {
        path: 'gallery',
        name: 'Gallery',
        component: Admin.GALLERY_DATA,
      },
      {
        path: 'itinerary',
        name: 'Itinerary',
        component: Admin.ITINERARY_DATA,
      },
      {
        path: 'restaurant',
        name: 'Restaurant',
        component: Admin.RESTAURANT_DATA,
      },
      {
        path: 'restaurant/:sku',
        name: 'Restaurant Detail',
        component: Admin.RESTAURANT_DETAIL,
      },
      {
        path: 'tour-guide',
        name: 'Tour Guide',
        component: Admin.TOUR_GUIDE_DATA,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
