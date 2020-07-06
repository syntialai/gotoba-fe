<template>
  <div :class="'search-autocomplete ' + {show: suggestionShow}">
    <b-list-group>
      <b-list-group-item
        v-for="suggestion in matches"
        :key="suggestion"
        @click="suggestionClick(suggestion)"
        :to="'/' + suggestion.toLowerCase().replace(' ', '+')"
        class="d-flex justify-content-between border-none"
      >
        <div class="info d-flex">
          <div class="icon-gray">
            <font-awesome-icon icon="search"></font-awesome-icon>
          </div>
          <div class="bold font-color-black-87 pl-3">
            {{ suggestion }}
          </div>
        </div>
        <div class="icon-gray">
          <font-awesome-icon icon="external-link-alt"></font-awesome-icon>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'SearchAutocomplete',
  computed: {
    suggestions() {
      return this.$store.getters.searchSuggestions;
    },
    suggestionShow() {
      return this.$store.getters.searchSuggestionShow;
    },
    matches() {
      const keyword = this.$store.getters.searchKeywords;
      return this.suggestions.filter(
        (str) => str.substr(0, keyword.length).toLowerCase() === keyword.toLowerCase(),
      );
    },
  },
  methods: {
    suggestionClick(suggestion) {
      this.selection = suggestion;
      this.show = false;
    },
  },
};
</script>
