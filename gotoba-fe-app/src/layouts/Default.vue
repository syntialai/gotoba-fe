<template>
  <div class="default">
    <background />

    <navigation :title="currentRouteName" />

    <slot />

    <bottom-nav-user />
  </div>
</template>

<script>
import Background from '../components/Partial/Background.vue';
import BottomNavUser from '../components/Partial/BottomNavUser.vue';
import Navigation from '../components/Partial/Navigation.vue';

export default {
  name: 'Default',
  components: {
    Background,
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
