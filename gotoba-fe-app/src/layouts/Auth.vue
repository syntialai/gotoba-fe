<template>
  <div class="auth">
    <background />

    <navigation-close />

    <slot />
  </div>
</template>

<script>
import Background from '../components/Partial/Background.vue';
import NavigationClose from '../components/Partial/NavigationClose.vue';

export default {
  name: 'Auth',
  components: {
    Background,
    NavigationClose,
  },
};
</script>
