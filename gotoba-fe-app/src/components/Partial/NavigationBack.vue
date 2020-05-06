<template>
  <div class="navigation-back">
    <b-navbar class="bg-color-primary text-white">
      <b-navbar-nav class="d-flex align-center">
        <b-navbar-item class="icon p-0 m-0" @click="router.go(-1)">
          <p class="font-size-24 m-0">
            <b-icon icon="arrow-left-short" class="mr-3" />
          </p>
        </b-navbar-item>
        <b-navbar-item class="nav-title semibold font-size-24 p-0 m-0">
          {{ title }}
        </b-navbar-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavigationBack',
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.nav-back {
  height: 56px;
}
</style>
