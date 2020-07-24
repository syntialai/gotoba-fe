<template>
  <div class="search">
    <search-navigation class="mb-1" v-on:search="doSearch" />

    <search-content
      title="Your History"
      :keywords="history"
      v-if="searchKeywords.length <= 2"
      class="mt-3 mb-3"
    />

    <search-result v-if="searchKeywords.length > 2" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchNavigation from '../../../components/User/Search/SearchNavigation.vue';
import SearchContent from '../../../components/User/Search/SearchContent.vue';
import SearchResult from '../../../components/User/Search/SearchResult.vue';

export default {
  name: 'Search',
  components: {
    SearchNavigation,
    SearchContent,
    SearchResult,
  },
  computed: {
    ...mapGetters([
      'searchKeywords',
      'searchWisataResults',
      'searchRestaurantResults',
      'searchSuggestionShow',
    ]),
    history() {
      const searchHistory = localStorage.getItem('searchHistory') || null;

      if (searchHistory) {
        return JSON.parse(searchHistory).history;
      }

      return searchHistory;
    },
  },
  created() {
    this.getSearchWisataResults();
    this.getSearchRestaurantResults();
    this.setSearchSuggestions([
      ...this.searchRestaurantResults,
      ...this.searchWisataResults,
    ]);
  },
  methods: {
    ...mapActions([
      'getSearchWisataResults',
      'getSearchRestaurantResults',
      'setSearchSuggestions',
      'setSearchShowStatus',
    ]),
    doSearch() {
      this.setSearchShowStatus(false);

      const history = JSON.parse(localStorage.getItem('searchHistory'));
      if (history) {
        history.history.push(this.searchKeywords);
        const res = JSON.stringify(history);
        localStorage.setItem('searchHistory', res);
        return;
      }

      localStorage.setItem('searchHistory', JSON.stringify({
        history: [this.searchKeywords],
      }));
    },
  },
};
</script>
