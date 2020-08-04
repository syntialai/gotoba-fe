<template>
  <div class="default-back">
    <navigation-back />

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
};
</script>
