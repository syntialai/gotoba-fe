<template>
  <b-navbar class="nav-search bg-color-primary text-white">
    <b-navbar-nav class="d-flex align-center w-100">
      <b-nav-item class="icon p-0 m-0" @click="goBack">
        <p class="font-size-24 m-0 text-white">
          <b-icon icon="arrow-left-short" class="mr-3" />
        </p>
      </b-nav-item>
      <b-nav-item class="w-100 pr-3">
        <b-input-group class="w-100 border-circle">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-search"
            v-model="keywords"
            type="search"
            autocomplete="off"
            debounce="1000"
            @keyup.enter="$emit('search')"
            placeholder="Search for place, eat, ..."
          ></b-form-input>
        </b-input-group>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'SearchNavigation',
  computed: {
    keywords: {
      get() {
        return this.$store.getters.searchKeywords;
      },
      set(value) {
        this.$store.dispatch('setSearchKeywords', value);
      },
    },
  },
  methods: {
    goBack() {
      this.$store.dispatch('setSearchKeywords', '');
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/index";

.nav-search {
  height: 56px;
}

form {
  width: 100%;
}

.input-group-text {
  border-radius: 50px 0 0 50px;
}

#input-search {
  border-radius: 0 50px 50px 0;
}
</style>
