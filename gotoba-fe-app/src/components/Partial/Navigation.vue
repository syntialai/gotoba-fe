<template>
  <div id="nav">
    <b-navbar variant="faded" class="bg-transparent text-white pr-1">
      <b-navbar-brand href="/" class="d-flex align-items-center">
        <img v-if="title === 'Home'" src="https://placekitten.com/g/30/30"
          class="d-inline-block align-top mr-2"
          alt="gotoba"
        >
        <p class="text-white font-size-20 m-0">{{ title }}</p>
      </b-navbar-brand>
      <b-navbar-nav right class="ml-auto">
        <b-nav-item href="/search">
          <p class="text-white mb-0"><b-icon icon="search"></b-icon></p>
        </b-nav-item>
        <b-nav-item href="/notification">
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
