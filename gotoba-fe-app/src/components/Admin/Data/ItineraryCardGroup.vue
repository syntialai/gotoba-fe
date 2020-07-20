<template>
  <div class="itinerary-card-group">
    <b-card-group>
      <itinerary-card
        v-for="itinerary of itineraries"
        :key="itinerary.sku"
        :itinerary="itinerary"
      />
    </b-card-group>
  </div>
</template>

<script>
import ItineraryCard from '../Card/ItineraryCard.vue';

export default {
  name: 'ItineraryCardGroup',
  components: {
    ItineraryCard,
  },
  props: {
    itineraries: Array,
    start: Number,
    end: Number,
  },
  computed: {
    itineraryRange() {
      return this.itineraries.slice(this.start - 1, this.end);
    },
  },
  methods: {
    goToDetails(sku) {
      this.$router.push(`/admin/itinerary/${sku}`);
    },
  },
};
</script>
