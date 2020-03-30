<template>
  <div id="app">
    <Background />
    <router-view />
  </div>
</template>

<script>
import Background from '@/components/Background.vue';

export default {
  name: 'App',
  components: {
    Background,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/index";

#app {
  margin-top: 0;
  background-color: $bg-color;
}
</style>
