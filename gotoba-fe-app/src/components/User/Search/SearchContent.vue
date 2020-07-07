<template>
  <div class="search-content">
    <div class="p-3">
      <div class="title font-color-blue-primary mb-3">
        <h5>{{ title }}</h5>
      </div>
      <div class="mt-1">
        <b-button
          pill
          variant="outline-secondary"
          v-for="item in keywords"
          :key="item"
          @click="searchItem(item)"
          class="mr-3"
        >
          {{ item }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchContent',
  props: {
    title: String,
    keywords: Array,
  },
  methods: {
    searchItem(keyword) {
      this.$router.push({
        path: '/search',
        query: {
          q: keyword,
        },
      });
    },
  },
};
</script>
