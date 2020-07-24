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

    <div v-else class="vh-100 d-flex">
      <div class="align-self-center align-center">
        <div class="image-no-data">
          <img
            src="@/assets/img/illustrate/no-data.png"
            alt="No-Data"
            width="50%"
          >
        </div>
        <div class="info-no-data m-3">
          <div class="font-color-black-60">
            <div class="semibold">
              We couldn't find what you're looking for...
            </div>
            <div>Try searching with another keyword.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
          searchResults: this.filterSearch(this.searchKeywords, this.searchWisataResults),
        },
        {
          categoryTitle: 'Eats related to',
          categoryIcon: 'utensils',
          categoryColor: 'orange',
          category: 'restaurant',
          searchResults: this.filterSearch(this.searchKeywords, this.searchRestaurantResults),
        },
      ];
    },
  },
  methods: {
    filterSearch(word, array) {
      const keyword = word.trim().toLowerCase();
      return array.filter(
        (data) => (data.name.toLowerCase().includes(keyword)
        || data.title.toLowerCase().includes(keyword))
        && keyword.length > 2,
      );
    },
  },
};
</script>
