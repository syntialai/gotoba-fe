<template>
  <div class="search-admin d-flex justify-content-between align-items-center w-100">
    <div class="w-100">
      <b-form-input
        class="search-input"
        v-model="keywords"
        placeholder="Search for ..."
        type="search"
      />
    </div>
    <div class="search-icon px-1">
      <router-link to="" class="icon-black-60 icon">
        <b-icon icon="search"></b-icon>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  border: none;
  border-bottom: 1px solid black;
  border-radius: 0;
  background: none;
}
</style>
