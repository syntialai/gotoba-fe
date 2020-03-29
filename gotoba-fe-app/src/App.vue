<template>
  <div id="app">
    <Background />
    <div class="container">
      <router-view />
    </div>
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

.container {
  background-color: white;
}

#app {
  margin-top: 0;
}
</style>
