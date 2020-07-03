import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/User/Main.vue';
import Home from '../views/User/Home/Home.vue';
import index from '../store/index';
import {
  Pages, Admin, Merchant, NOT_FOUND,
} from './pages';

Vue.use(VueRouter);

function checkAdminRole(to, from, next) {
  const role = index.getters('userRole');

  if (role === 'admin') {
    next();
  } else if (role === 'merchant') {
    next('/merchant');
  } else {
    next('/');
  }
}

function checkMerchantRole(to, from, next) {
  const role = index.getters('userRole');

  if (role === 'merchant') {
    next();
  } else if (role === 'admin') {
    next('/admin');
  } else {
    next('/');
  }
}

function checkUserRole(to, from, next) {
  const role = index.getters('userRole');

  if (role === 'user') {
    next();
  } else if (role === 'merchant') {
    next('/merchant');
  } else if (role === 'admin') {
    next('/admin');
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'my-itinerary',
        name: 'Itinerary',
        component: Pages.ITINERARY,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'my-tickets',
        name: 'My Tickets',
        beforeEnter: checkUserRole,
        component: Pages.MY_TICKETS,
        children: [
          {
            path: '',
            component: Pages.TICKET_VALID,
            meta: {
              layout: 'background-blue',
            },
          },
          {
            path: 'expired',
            component: Pages.TICKET_EXPIRED,
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
        beforeEnter: checkUserRole,
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
    path: '/tour-guide/:sku',
    name: 'Tour Guide',
    component: Pages.TOUR_GUIDE_PROFILE,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/tour-guide/:sku/review',
    name: 'Tour Guide Review',
    component: Pages.TOUR_GUIDE_REVIEW,
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
  {
    path: '/gallery',
    name: 'Gallery',
    component: Pages.GALLERY,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/itinerary/add/show-on-map',
    name: 'Set Destination',
    beforeEnter: checkUserRole,
    component: Pages.ADD_DESTINATION,
  },
  {
    path: '/my-tickets/:sku',
    name: 'QR Code',
    beforeEnter: checkUserRole,
    component: Pages.SHOW_QR_CODE,
  },
  {
    path: '/payment/:sku',
    name: 'Payment Process',
    beforeEnter: checkUserRole,
    component: Pages.PAYMENT,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/order/thankyou/:sku',
    name: 'Payment Order',
    beforeEnter: checkUserRole,
    component: Pages.PAYMENT_ORDER,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/profile/edit',
    name: 'Edit Profile',
    beforeEnter: checkUserRole,
    component: Pages.EDIT_PROFILE,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/history',
    name: 'History',
    beforeEnter: checkUserRole,
    component: Pages.HISTORY,
    children: [
      {
        path: '',
        name: 'History Success',
        component: Pages.HISTORY_SUCCESS,
        meta: {
          layout: 'default-back',
        },
      },
      {
        path: 'pending',
        name: 'History Pending',
        component: Pages.HISTORY_PENDING,
        meta: {
          layout: 'default-back',
        },
      },
      {
        path: 'cancelled',
        name: 'History Cancelled',
        component: Pages.HISTORY_CANCELLED,
        meta: {
          layout: 'default-back',
        },
      },
    ],
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/history/details/:sku',
    name: 'History Details',
    beforeEnter: checkUserRole,
    component: Pages.HISTORY_DETAILS,
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
    // beforeEnter: checkAdminRole,
    redirect: '/admin/dashboard',
    component: Admin.ADMIN_VIEW,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Admin.DASHBOARD,
      },
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
        path: 'gallery/:sku',
        name: 'Gallery Detail',
        component: Admin.GALLERY_DETAIL,
      },
      {
        path: 'itinerary',
        name: 'Itinerary',
        component: Admin.ITINERARY_DATA,
      },
      {
        path: 'itinerary/:sku',
        name: 'Itinerary Detail',
        component: Admin.ITINERARY_DETAIL,
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
      {
        path: 'tour-guide/:sku',
        name: 'Tour Guide Detail',
        component: Admin.TOUR_GUIDE_DETAIL,
      },
    ],
  },
  {
    path: '/merchant',
    name: 'Merchant',
    beforeEnter: checkMerchantRole,
    redirect: '/merchant/order-list',
    component: Merchant.MERCHANT_VIEW,
    children: [
      {
        path: 'order-list',
        name: 'Order List',
        component: Merchant.MERCHANT_ORDER_LIST,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'bistro',
        name: 'My Bistro',
        component: Merchant.MERCHANT_BISTRO,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'spot',
        name: 'My Spot',
        component: Merchant.MERCHANT_SPOT,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Merchant.MERCHANT_PROFILE,
        meta: {
          layout: 'background-blue',
        },
      },
    ],
  },
  {
    path: '/merchant/bistro/edit',
    name: 'Edit Bistro',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_BISTRO_EDIT,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/merchant/bistro/review',
    name: 'Bistro Review',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_BISTRO_REVIEW,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/merchant/bistro/promotion/:sku',
    name: 'Bistro Promotion',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_BISTRO_PROMOTION,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/merchant/scan',
    name: 'Scan',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_SCANNER,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/merchant/scan/result',
    name: 'Scan Result',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_SCAN_RESULT,
  },
  {
    path: '/merchant/spot/:sku',
    name: 'Spot Profile',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_SPOT_DETAIL,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/merchant/spot/:sku/edit',
    name: 'Edit Spot',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_SPOT_EDIT,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/merchant/spot/promotion/:sku',
    name: 'Spot Promotion',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_SPOT_PROMOTION,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '*',
    name: 'Not Found',
    component: NOT_FOUND,
    meta: {
      layout: 'not-found',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
