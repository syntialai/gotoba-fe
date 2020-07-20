<template>
  <div class="search-result-category">
    <div class="category-title d-flex align-items-center mt-2">
      <font-awesome-icon
        :icon="categoryIcon"
        :class="'font-color-accent-' + categoryColor"
      ></font-awesome-icon>
      <div class="title pl-2">{{ categoryTitle }}</div>
      <div class="keywords font-color-blue-secondary semibold pl-1">
        {{ searchKeyword }}
      </div>
    </div>

    <div class="category-group mt-2">
      <card-search-result
        v-for="item in searchResults"
        :key="item.sku"
        :sku="item.sku"
        :title="item.title"
        :category="category"
        :icon1="info.icon1"
        :icon2="info.icon2"
        :value1="item.address"
        :value2="category === 'journey'? item.price : item.bistroType"
        :rating="item.rating"
      />
    </div>
  </div>
</template>

<script>
import CardSearchResult from './CardSearchResult.vue';

export default {
  name: 'SearchResultCategory',
  components: {
    CardSearchResult,
  },
  props: {
    categoryIcon: String,
    categoryTitle: String,
    category: String,
    categoryColor: String,
    searchResults: Array,
    searchKeyword: String,
  },
  computed: {
    info() {
      if (this.category === 'journey') {
        return {
          icon1: 'map-marker-alt',
          icon2: 'tag',
        };
      }

      return {
        icon1: 'map-marker-alt',
        icon2: 'hamburger',
      };
    },
  },
};
</script>
