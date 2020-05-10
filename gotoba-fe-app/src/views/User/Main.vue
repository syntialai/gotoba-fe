<template>
  <div class="main">
    <navigation :title="currentRouteName" />

    <router-view></router-view>

    <bottom-nav-user />
  </div>
</template>

<script>
import BottomNavUser from '../../components/Partial/BottomNavUser.vue';
import Navigation from '../../components/Partial/Navigation.vue';

export default {
  name: 'Main',
  components: {
    BottomNavUser,
    Navigation,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
