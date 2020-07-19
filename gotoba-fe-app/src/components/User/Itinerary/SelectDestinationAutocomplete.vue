<template>
  <div class="select-destination-autocomplete">
    <datalist id="location-list">
      <option>
        <div class="p-2 border-bottom-gray-young">
          <b-button variant="outline-secondary" @click="showOnMap">
            <font-awesome-icon
              class="icon-accent-green"
              icon="map"
            ></font-awesome-icon>
            <div class="pl-2">Select via Map</div>
          </b-button>
        </div>
      </option>
      <option
        v-for="location in locationList"
        :key="location"
      >
        <card-location
          :name="location.name"
          :location="location.address"
        />
      </option>
    </datalist>
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
    locationList: Array,
    searchKeywords: String,
  },
  computed: {
    matches() {
      return this.locationList.filter(
        (str) => str.substr(
          0,
          this.searchKeywords.length,
        ).toLowerCase()
        === this.searchKeywords.toLowerCase(),
      );
    },
  },
  methods: {
    showOnMap() {
      this.$router.push('/itinerary/add/show-on-map');
    },
  },
};
</script>
