<template>
  <div class="nav-back">
    <b-navbar type="dark" class="bg-color-primary">
      <b-navbar-nav class="d-flex align-center">
        <b-nav-item class="icon p-0 m-0" @click="goBack">
          <div class="mr-1">
            <font-awesome-icon icon="arrow-left" class="font-size-20" />
          </div>
        </b-nav-item>
        <b-nav-item class="nav-title semibold font-size-20 p-1 m-0">
          {{ currentRouteName }}
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavigationBack',
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-dark {
  height: 56px;

  .navbar-nav .nav-link {
    color: white;
  }
}
</style>
