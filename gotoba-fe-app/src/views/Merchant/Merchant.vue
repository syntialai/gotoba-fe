<template>
  <div class="main">
    <navigation :title="currentRouteName" />

    <router-view class="position-relative"></router-view>

    <bottom-nav :navItems="navItems" />
  </div>
</template>

<script>
import BottomNav from '../../components/Partial/BottomNav.vue';
import Navigation from '../../components/Partial/Navigation.vue';

export default {
  name: 'Merchant',
  components: {
    BottomNav,
    Navigation,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  data() {
    return {
      navItems: [
        {
          id: 1, name: 'Order List', icon: 'clipboard-list', link: '/merchant/order-list',
        },
        {
          id: 2, name: 'My Bistro', icon: 'utensils', link: '/merchant/bistro',
        },
        {
          id: 3, name: 'Scan', icon: 'qrcode', link: '/merchant/scan',
        },
        {
          id: 4, name: 'My Spot', icon: 'route', link: '/merchant/spot',
        },
        {
          id: 5, name: 'Profile', icon: 'user', link: '/merchant/profile',
        },
      ],
    };
  },
};
</script>
