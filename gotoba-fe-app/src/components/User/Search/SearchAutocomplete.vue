<template>
  <div class="search-autocomplete">
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SearchAutocomplete',
  computed: {
    ...mapGetters(['searchSuggestions', 'searchKeywords']),
    matches() {
      return this.searchSuggestions.filter(
        (str) => str.substr(
          0,
          this.searchKeywords.length,
        ).toLowerCase()
        === this.searchKeywords.toLowerCase(),
      );
    },
  },
  methods: {
    ...mapActions(['setSearchShowStatus']),
    suggestionClick(suggestion) {
      this.selection = suggestion;
      this.setSearchShowStatus(false);
    },
  },
};
</script>
