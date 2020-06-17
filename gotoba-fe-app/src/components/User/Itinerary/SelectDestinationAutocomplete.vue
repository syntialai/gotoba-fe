<template>
  <div class="select-destination-autocomplete" v-if="showAutocomplete">
    <div class="p-2 border-bottom-gray-young">
      <b-button variant="outline-secondary">
        <font-awesome-icon
          class="icon-accent-green"
          icon="map"
        ></font-awesome-icon>
        <div class="pl-2">Select via Map</div>
      </b-button>
    </div>
    <b-list-group class="mt-2">
      <b-list-group-item
        v-for="suggestion in matches"
        :key="suggestion"
        @click="suggestionClick(suggestion)"
        :href="'/' + suggestion.toLowerCase().replace(' ', '+')"
        class="d-flex justify-content-between border-none"
      >
        <card-location
          :name="suggestion.name"
          :location="suggestion.location"
        />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import CardLocation from './CardLocation.vue';

export default {
  name: 'SelectDestinationAutocomplete',
  components: {
    CardLocation,
  },
  props: {
    showAutocomplete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      matches: [],
    };
  },
  method: {
    suggestionClick(suggestion) {
      this.$router.push(`${this.$route.path}/${suggestion.name}`);
    },
  },
};
</script>
