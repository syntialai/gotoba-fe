<template>
  <div class="select-destination-autocomplete w-100 bg-white"
    v-if="locationData && open && locationKeyword.length >= 3"
  >
    <ul id="location-list" class="p-2">
      <li>
        <div class="border-bottom-gray-young pb-2">
          <b-button
            variant="outline-secondary"
            class="d-flex align-items-center"
            @click="showOnMap"
          >
            <font-awesome-icon
              class="icon-accent-green"
              icon="map"
            ></font-awesome-icon>
            <div class="font-size-12 ml-2">Select via Map</div>
          </b-button>
        </div>
      </li>
      <li
        v-for="location in matches"
        :key="location.sku"
        @click="select(location.name)"
      >
        <card-location
          :name="location.name"
          :location="location.address"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CardLocation from './CardLocation.vue';

export default {
  name: 'SelectDestinationAutocomplete',
  components: {
    CardLocation,
  },
  data() {
    return {
      open: true,
    };
  },
  computed: {
    ...mapGetters(['locationKeyword', 'locationData']),
    matches() {
      return this.locationData.filter(
        (item) => item.name.substr(
          0,
          this.locationKeyword.length,
        ).toLowerCase()
        === this.locationKeyword.toLowerCase()
        || item.address.substr(
          0,
          this.locationKeyword.length,
        ).toLowerCase()
        === this.locationKeyword.toLowerCase(),
      );
    },
  },
  methods: {
    ...mapActions(['setLocationKeyword']),
    showOnMap() {
      this.$router.replace('/itinerary/add/show-on-map');
    },
    select(name) {
      this.setLocationKeyword(name);
      this.open = false;
    },
  },
};
</script>
