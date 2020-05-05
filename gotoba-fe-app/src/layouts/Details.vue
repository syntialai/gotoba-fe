<template>
  <div class="details">
    <navigation-back :title="currentRouteName" />

    <slot />
  </div>
</template>

<script>
import NavigationBack from '../components/Partial/NavigationBack.vue';

export default {
  name: 'Details',
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
