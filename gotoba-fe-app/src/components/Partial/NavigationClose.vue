<template>
  <div class="nav-close">
    <b-navbar variant="faded" class="text-white p-0">
      <b-navbar-nav class="ml-auto m-3">
        <b-nav-item href="/">
          <font-awesome-icon
            icon="times"
            class="font-size-32 text-white"
          ></font-awesome-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavigationClose',
};
</script>

<style lang="scss" scoped>
.navbar-expand .navbar-nav .nav-link {
    padding-right: 0;
}

.nav-close {
  max-width: 768px;
  margin-bottom: 200px;
}
</style>
