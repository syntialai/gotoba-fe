<template>
  <div class="default-back">
    <navigation-back :title="currentRouteName" />

    <slot />
  </div>
</template>

<script>
import NavigationBack from '../components/Partial/NavigationBack.vue';

export default {
  name: 'DefaultBack',
  components: {
    NavigationBack,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
