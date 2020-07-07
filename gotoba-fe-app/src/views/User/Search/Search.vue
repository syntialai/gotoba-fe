<template>
  <div class="search">
    <search-navigation class="mb-1" v-on:search="doSearch" />

    <search-autocomplete
      v-if="searchKeywords.length > 1"
    ></search-autocomplete>

    <search-content
      title="Your History"
      :keywords="history"
      v-if="history"
      class="mt-3 mb-3"
    />

    <search-result v-if="showResult" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchNavigation from '../../../components/User/Search/SearchNavigation.vue';
import SearchContent from '../../../components/User/Search/SearchContent.vue';
import SearchAutocomplete from '../../../components/User/Search/SearchAutocomplete.vue';
import SearchResult from '../../../components/User/Search/SearchResult.vue';

export default {
  name: 'Search',
  components: {
    SearchNavigation,
    SearchContent,
    SearchAutocomplete,
    SearchResult,
  },
  computed: {
    ...mapGetters(['searchKeywords']),
    history() {
      const searchHistory = localStorage.getItem('searchHistory') || null;
      return searchHistory;
    },
  },
  data() {
    return {
      showResult: false,
    };
  },
  methods: {
    doSearch() {
      this.$router.push({
        path: '/search',
        query: {
          q: this.searchKeywords,
        },
      });
      this.showResult = true;
    },
  },
};
</script>
