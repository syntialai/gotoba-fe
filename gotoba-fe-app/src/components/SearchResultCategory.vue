<template>
  <div class="search-result-category">
    <div class="category-title">
      <font-awesome-icon
        :icon="categoryIcon"
        :class="'font-color-accent-' + categoryColor"
      ></font-awesome-icon>
      <div class="title pl-1">{{ categoryTitle }}</div>
    </div>

    <div class="category-group">
      <CardSearchResult 
        v-for="item in searchResults"
        :key="item.sku"
        v-bind="item"
      />
    </div>
  </div>
</template>

<script>
import CardSearchResult from '@/components/CardSearchResult.vue';

export default {
  name: 'SearchResultCategory',
  components: {
    CardSearchResult,
  },
  props: {
    categoryIcon: String,
    categoryTitle: String,
    categoryColor: String,
  },
  computed: {
    searchResults() {
      return this.$store.getters.searchResults;
    },
  },
};
</script>
