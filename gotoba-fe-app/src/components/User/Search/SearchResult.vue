<template>
  <div class="search-result">
    <div v-if="searchResultTotal > 0" class="m-3">
      <search-result-category
        v-for="item in searchResults"
        :key="item.name"
        :searchKeyword="searchKeywords"
        v-bind="item"
      />
    </div>

    <div v-else>
      <div class="image-no-data">
        <img src="public/assets/img/no-data.png" alt="No-Data">
      </div>
      <div class="info-no-data">
        <div class="align-center font-color-black-60">
          <div class="semibold">
            We couldn't find what you're looking for...
          </div>
          <div>Try searching with another keyword.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchResultCategory from './SearchResultCategory.vue';

export default {
  name: 'SearchResult',
  components: {
    SearchResultCategory,
  },
  computed: {
    ...mapGetters(['searchWisataResults', 'searchRestaurantResults', 'searchKeywords']),
    searchResultTotal() {
      return this.searchWisataResults.length + this.searchRestaurantResults.length;
    },
    searchResults() {
      return [
        {
          categoryTitle: 'Places related to',
          categoryIcon: 'map-marked-alt',
          categoryColor: 'green',
          category: 'journey',
          searchResults: this.searchWisataResults,
        },
        {
          categoryTitle: 'Eats related to',
          categoryIcon: 'utensils',
          categoryColor: 'orange',
          category: 'restaurant',
          searchResults: this.searchRestaurantResults,
        },
      ];
    },
  },
  created() {
    this.getSearchWisataResults();
    this.getSearchRestaurantResults();
  },
  methods: {
    ...mapActions(['getSearchWisataResults', 'getSearchRestaurantResults']),
  },
};
</script>
