<template>
  <div id="app">
    <alert class="m-0 p-0" />
    <toast class="m-0 p-0" />

    <component :is="layout">
      <router-view class="h-100" />
    </component>
  </div>
</template>

<script>
import Auth from './layouts/Auth.vue';
import BackgroundBlue from './layouts/BackgroundBlue.vue';
import Default from './layouts/Default.vue';
import DefaultBack from './layouts/DefaultBack.vue';
import NotFound from './layouts/NotFound.vue';
import Alert from './components/Partial/Alert.vue';
import Toast from './components/Partial/Toast.vue';

export default {
  name: 'App',
  components: {
    Auth,
    BackgroundBlue,
    Default,
    DefaultBack,
    NotFound,
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
  background-color: $bg-color;
}
</style>
