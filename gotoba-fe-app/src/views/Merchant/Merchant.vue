<template>
  <div class="main">
    <navigation :title="currentRouteName" />

    <router-view></router-view>

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
    navItems() {
      return [
        {
          id: 1, name: 'Order List', icon: 'clipboard-list', link: '/merchant/order-list',
        },
        {
          id: 2, name: 'My Bistro', icon: 'utensil', link: '/merchant/bistro',
        },
        {
          id: 3, name: 'My Spot', icon: 'route', link: '/merchant/spot',
        },
        {
          id: 4, name: 'Profile', icon: 'user', link: '/merchant/profile',
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.main {
  max-width: 768px;
}
</style>
