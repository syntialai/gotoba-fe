<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Admin from './layouts/Admin.vue';
import Default from './layouts/Default.vue';

export default {
  name: 'App',
  components: {
    Admin,
    Default,
  },
  data() {
    return {
      layout: 'admin',
    };
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
