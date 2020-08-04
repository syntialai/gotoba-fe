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
  const role = index.getters.userRole;

  if (role === 'ROLE_ADMIN') {
    next();
  } else if (role === 'ROLE_MERCHANT') {
    next('/merchant');
  } else if (role === 'ROLE_USER') {
    next('/');
  } else {
    next('/login');
  }
}

function checkMerchantRole(to, from, next) {
  const role = index.getters.userRole;

  if (role === 'ROLE_MERCHANT') {
    next();
  } else if (role === 'ROLE_ADMIN') {
    next('/admin');
  } else if (role === 'ROLE_USER') {
    next('/');
  } else {
    next('/login');
  }
}

function checkUserRole(to, from, next) {
  const role = index.getters.userRole;

  if (role === 'ROLE_USER') {
    next();
  } else if (role === 'ROLE_MERCHANT') {
    next('/merchant');
  } else if (role === 'ROLE_ADMIN') {
    next('/admin');
  } else {
    next('/login');
  }
}

function checkRole(to, from, next) {
  const role = index.getters.userRole;

  if (role === 'ROLE_USER' || !role) {
    next();
  } else if (role === 'ROLE_MERCHANT') {
    next('/merchant');
  } else if (role === 'ROLE_ADMIN') {
    next('/admin');
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
        beforeEnter: checkRole,
        component: Home,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'itinerary',
        name: 'Itinerary',
        beforeEnter: checkRole,
        component: Pages.ITINERARY,
        meta: {
          layout: 'background-blue',
        },
      },
      {
        path: 'my-tickets',
        beforeEnter: checkUserRole,
        component: Pages.MY_TICKETS,
        children: [
          {
            path: '',
            name: 'My Tickets',
            component: Pages.TICKET_VALID,
            meta: {
              layout: 'background-blue',
            },
          },
          {
            path: 'expired',
            name: 'My Tickets',
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
        beforeEnter: checkUserRole,
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
    path: '/about',
    name: 'About',
    component: Pages.ABOUT,
  },
  {
    path: '/search',
    name: 'Search',
    component: Pages.SEARCH,
  },
  {
    path: '/more',
    component: Pages.HOME_MORE,
    children: [
      {
        path: '',
        name: 'More',
        component: Pages.PROMOTION,
        meta: {
          layout: 'default-back',
        },
      },
      {
        path: 'restaurant',
        name: 'Restaurant',
        component: Pages.RESTAURANT,
        meta: {
          layout: 'default-back',
        },
      },
      {
        path: 'journey',
        name: 'Journey',
        component: Pages.JOURNEY,
        meta: {
          layout: 'default-back',
        },
      },
      {
        path: 'tour-guide',
        name: 'Tour Guide',
        component: Pages.TOUR_GUIDE,
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
    path: '/restaurant/:sku',
    name: 'Restaurant Profile',
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
    name: 'Journey Profile',
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
    name: 'Tour Guide Profile',
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
    path: '/ticket/:sku',
    name: 'Ticket Detail',
    component: Pages.TICKET_DETAIL,
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
    path: '/itinerary/add',
    name: 'Add Itinerary',
    beforeEnter: checkUserRole,
    component: Pages.ITINERARY_ADD,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/itinerary/add/show-on-map',
    name: 'Set Destination',
    component: Pages.ADD_DESTINATION,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/my-tickets/:sku',
    name: 'QR Code',
    beforeEnter: checkUserRole,
    component: Pages.SHOW_QR_CODE,
  },
  {
    path: '/payment',
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
    path: '/review/:sku',
    name: 'Review',
    beforeEnter: checkUserRole,
    component: Pages.REVIEW,
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
        name: 'History',
        component: Pages.HISTORY_PENDING,
        meta: {
          layout: 'default-back',
        },
      },
      {
        path: 'done',
        name: 'History Success',
        component: Pages.HISTORY_SUCCESS,
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
    path: '/admin',
    name: 'Admin',
    beforeEnter: checkAdminRole,
    redirect: '/admin/user',
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
        children: [
          {
            path: '',
            name: 'Order List',
            component: Merchant.MERCHANT_ORDER_NEW,
            meta: {
              layout: 'background-blue',
            },
          },
          {
            path: 'recent',
            name: 'Order List',
            component: Merchant.MERCHANT_ORDER_RECENT,
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
    meta: {
      layout: 'default-back',
    },
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
    path: '/merchant/profile/edit',
    name: 'Edit Profile',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_EDIT_PROFILE,
    meta: {
      layout: 'default-back',
    },
  },
  {
    path: '/merchant/set-location/:category',
    name: 'Set Location',
    beforeEnter: checkMerchantRole,
    component: Merchant.MERCHANT_ADD_LOCATION,
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
