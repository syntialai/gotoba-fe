<template>
  <div class="search">
    <SearchNavigation class="mb-1" />

    <SearchAutocomplete
      :show="keywords.length > 0"
    ></SearchAutocomplete>

    <SearchContent
      title="Your History"
      :keywords='history'
      v-if="history.length > 0"
      class="mt-3 mb-3"
    />

    <SearchContent
      title="Recommendation"
      :keywords='recommendation'
      v-if="recommendation.length > 0"
      class="mt-3"
    />
  </div>
</template>

<script>
import SearchNavigation from '@/components/User/Search/SearchNavigation.vue';
import SearchContent from '@/components/User/Search/SearchContent.vue';
import SearchAutocomplete from '@/components/User/Search/SearchAutocomplete.vue';

export default {
  name: 'Search',
  components: {
    SearchNavigation,
    SearchContent,
    SearchAutocomplete,
  },
  data() {
    return {
      history: [],
      recommendation: [],
      cities: [
        'Bangalore',
        'Chennai',
        'Cochin',
        'Delhi',
        'Kolkata',
        'Mumbai',
      ],
    };
  },
  computed: {
    keywords() {
      return this.$store.getters.searchKeywords;
    },
    suggestions: {
      get() {
        return this.$store.state.searchSuggestions;
      },
      set(value) {
        this.$store.dispatch('setSearchSuggestions', value);
      },
    },
  },
};
</script>
