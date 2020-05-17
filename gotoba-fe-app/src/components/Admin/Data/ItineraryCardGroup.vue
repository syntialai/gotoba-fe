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
  },
};
</script>
