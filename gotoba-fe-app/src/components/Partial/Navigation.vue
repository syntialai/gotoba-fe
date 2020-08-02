<template>
  <div id="nav">
    <b-navbar
      variant="faded"
      class="bg-transparent pr-1"
    >
      <b-navbar-brand class="d-flex align-items-center">
        <div class="logo" v-if="isTitleHome">
          <img
            src="@/assets/img/logo/gotoba-logo-half-white.png"
            class="d-inline-block align-top p-1"
            alt="gotoba"
            height="36px"
          >
        </div>
        <div class="page-name" v-else>
          <p class="font-size-20 m-0 text-white">{{ title }}</p>
        </div>
      </b-navbar-brand>
      <b-navbar-nav right class="ml-auto">
        <b-nav-item to="/about" class="semibold">ABOUT</b-nav-item>
        <b-nav-item to="/search" v-if="isUser">
          <p class="mb-0 mr-0"><b-icon icon="search"></b-icon></p>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  props: {
    title: String,
  },
  computed: {
    ...mapGetters(['userRole']),
    isTitleHome() {
      return this.title === 'Home' || this.title === 'Order List';
    },
    isUser() {
      return this.userRole === 'ROLE_USER';
    },
  },
};
</script>

<style lang="scss" scoped>
a.nav-link {
  color: white!important;
}
</style>
