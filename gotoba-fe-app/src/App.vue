<template>
  <div id="app">
    <alert />
    <toast />

    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Auth from './layouts/Auth.vue';
import BackgroundBlue from './layouts/BackgroundBlue.vue';
import Default from './layouts/Default.vue';
import DefaultBack from './layouts/DefaultBack.vue';
import Alert from './components/Partial/Alert.vue';
import Toast from './components/Partial/Toast.vue';

export default {
  name: 'App',
  components: {
    Auth,
    BackgroundBlue,
    Default,
    DefaultBack,
    Alert,
    Toast,
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
