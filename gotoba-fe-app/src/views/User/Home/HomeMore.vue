<template>
  <div class="home-more bg-white m-0">
    <b-nav tabs fill class="home-tabs">
      <b-nav-item
        to="/more" exact
        exact-active-class="active"
      >
        All Promos
      </b-nav-item>
      <b-nav-item
        to="/more/restaurant" exact
        exact-active-class="active"
      >
        Journey
      </b-nav-item>
      <b-nav-item
        to="/more/journey" exact
        exact-active-class="active"
      >
        Restaurant
      </b-nav-item>
      <b-nav-item
        to="/more/tour-guide" exact
        exact-active-class="active"
      >
        Tour Guide
      </b-nav-item>
    </b-nav>

    <router-view class="overflow-hidden min-vh-100"></router-view>
  </div>
</template>

<script>
export default {
  name: 'HomeMore',
};
</script>

<style lang="scss">
.nav-tabs .nav-link {
  font-size: 16px!important;
}

@media screen and (max-width: 352px) {
  .nav-tabs .nav-link {
    font-size: 14px!important;
  }
}
</style>
