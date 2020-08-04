<template>
  <div class="spot-card-group">
    <ul class="list-unstyled">
      <router-link
        v-for="itinerary of itineraries"
        :key="itinerary.sku"
        :to="goToSpotDetail(itinerary.sku)"
      >
        <card-spot :itinerary="itinerary" />
      </router-link>
    </ul>
  </div>
</template>

<script>
import CardSpot from '../Card/CardSpot.vue';

export default {
  name: 'SpotCardGroup',
  components: {
    CardSpot,
  },
  props: {
    itineraries: Array,
  },
  methods: {
    goToSpotDetail(sku) {
      return `/merchant/spot/${sku}`;
    },
  },
};
</script>
