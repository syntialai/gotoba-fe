<template>
  <div class="search-result">
    <div v-if="searchResultTotal > 0">
      <SearchResultCategory
        v-for="category in categories"
        :key="category.name"
        :class="{show: category.length > 0}"
        v-bind="category"
      />
    </div>
    
    <div
      v-else
      class=""
    >
      <div class="image-no-data">
        <img src="../assets/img/no-data.png" alt="No-Data">
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
import SearchResultCategory from '@/components/SearchResultCategory.vue';

export default {
  name: 'SearchResult',
  props: {
    searchKeyword: String,
    searchResultTotal: Number,
  },
  components: {
    SearchResultCategory,
  },
  data() {
    return {
      categories: [
        {
          categoryTitle: `Places near ${searchKeyword}`,
          categoryIcon: 'map-marked-alt',
          categoryColor: 'green',
          searchResults: [],
        },
        {
          categoryTitle: `Eats near ${searchKeyword}`,
          categoryIcon: 'utensils',
          categoryColor: 'orange',
          searchResults: [],
        },
        {
          categoryTitle: `Homestay near ${searchKeyword}`,
          categoryIcon: 'hotel',
          categoryColor: 'purple',
          searchResults: [],
        },
      ],
    };
  },
};
</script>
