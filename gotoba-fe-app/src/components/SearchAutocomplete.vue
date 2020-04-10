<template>
  <div class="auto-complete overflow-hidden">
    <vue-bootstrap-typeahead
      :data="autocompleteList"
      v-model="searchKeyword"
      size="sm"
      :serializer="s => s.text"
      placeholder="Type an address..."
      @hit="selectedKeyword = $event"
    >
  </div>
</template>

<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';

export default {
  name: 'SearchAutocomplete',
  components: {
    VueBootstrapTypeahead,
  },
  data() {
    return {
      autocompleteList: [],
      searchKeyword: '',
      selectedKeyword: null,
    };
  },
};
</script>
