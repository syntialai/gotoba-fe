<template>
  <div class="auth">
    <background />

    <navigation-close class="position-relative" />

    <div class="logo my-4 position-relative">
      <b-img
        center
        src="@/assets/img/logo/gotoba-logo-full.png"
        alt="gotoba"
        width="250"
      ></b-img>
    </div>

    <slot class="position-relative" />
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
