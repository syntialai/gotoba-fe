<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Admin from './layouts/Admin.vue';
import Auth from './layouts/Auth.vue';
import Default from './layouts/Default.vue';
import DefaultBack from './layouts/DefaultBack.vue';
import Empty from './layouts/Empty.vue';
import NotFound from './layouts/NotFound.vue';

export default {
  name: 'App',
  components: {
    Admin,
    Auth,
    Default,
    DefaultBack,
    Empty,
    NotFound,
  },
  computed: {
    layout() {
      return `${(this.$route.meta.layout || 'default')}`;
    },
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
