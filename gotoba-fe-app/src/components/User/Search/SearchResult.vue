<template>
  <div class="search-result">
    <div v-if="searchResultTotal > 0">
      <SearchResultCategory
        v-for="category in categories"
        :key="category.name"
        v-bind="category"
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
import SearchResultCategory from './SearchResultCategory.vue';

export default {
  name: 'SearchResult',
  components: {
    SearchResultCategory,
  },
  computed: {
    searchKeywords() {
      return this.$store.getters.searchKeywords;
    },
    searchResults() {
      return this.$store.getters.searchResults;
    },
    searchResultTotal() {
      return this.$store.getters.searchResults.length;
    },
  },
  data() {
    return {
      categories: [
        {
          categoryTitle: `Places related to ${this.searchKeywords}`,
          categoryIcon: 'map-marked-alt',
          categoryColor: 'green',
          searchResults: [],
        },
        {
          categoryTitle: `Eats related to ${this.searchKeywords}`,
          categoryIcon: 'utensils',
          categoryColor: 'orange',
          searchResults: [],
        },
        {
          categoryTitle: `Ticket with keyword ${this.searchKeywords}`,
          categoryIcon: 'hotel',
          categoryColor: 'purple',
          searchResults: [],
        },
      ],
    };
  },
};
</script>
