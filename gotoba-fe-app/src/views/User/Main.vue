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
  name: 'Main',
  components: {
    BottomNav,
    Navigation,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    navItems() {
      return [
        {
          id: 1, name: 'Home', icon: 'home', link: '/',
        },
        {
          id: 2, name: 'Itinerary', icon: 'route', link: '/my-itinerary',
        },
        {
          id: 3, name: 'My tickets', icon: 'qrcode', link: '/my-tickets',
        },
        {
          id: 4, name: 'Cart', icon: 'shopping-cart', link: '/cart',
        },
        {
          id: 5, name: 'Profile', icon: 'user', link: '/profile',
        },
      ];
    },
  },
};
</script>
