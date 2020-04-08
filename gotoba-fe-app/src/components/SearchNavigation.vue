<template>
  <b-navbar class="nav-search bg-color-primary text-white">
    <b-navbar-nav class="d-flex align-center">
      <b-navbar-item class="icon p-0 m-0" @click="router.go(-1)">
        <p class="font-size-24 m-0">
          <b-icon icon="arrow-left-short" class="mr-3" />
        </p>
      </b-navbar-item>
      <b-navbar-item class="w-100 pr-3">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-search"
            v-model="usernameOrEmail"
            type="search"
            required
            placeholder="Search for place, eat, ..."
            class="border-rounded"
          ></b-form-input>
        </b-input-group>
      </b-navbar-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'SearchNavigation',  
};
</script>

<style lang="scss" scoped>
.nav-search {
  height: 56px;
}
</style>
