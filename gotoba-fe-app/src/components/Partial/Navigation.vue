<template>
  <div id="nav">
    <b-navbar variant="faded" class="bg-transparent text-white pr-1">
      <b-navbar-brand to="/" class="d-flex align-items-center">
        <div class="logo" v-if="title === 'Home' || title === 'Order List'">
          <img
            src="@/assets/img/logo/gotoba-logo-half-white.png"
            class="d-inline-block align-top p-1"
            alt="gotoba"
            height="36px"
          >
        </div>
        <div class="page-name" v-else>
          <p class="text-white font-size-20 m-0">{{ title }}</p>
        </div>
      </b-navbar-brand>
      <b-navbar-nav right class="ml-auto">
        <b-nav-item to="/search">
          <p class="text-white mb-0"><b-icon icon="search"></b-icon></p>
        </b-nav-item>
        <b-nav-item to="/notification">
          <p class="text-white mb-0"><b-icon icon="bell-fill"></b-icon></p>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    title: String,
  },
};
</script>
