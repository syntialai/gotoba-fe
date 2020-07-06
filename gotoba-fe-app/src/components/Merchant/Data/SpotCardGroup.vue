<template>
  <div class="spot-card-group">
    <ul class="list-unstyled">
      <card-spot
        v-for="itinerary of itineraries"
        :key="itinerary.sku"
        v-bind="itinerary"
        @click="toSpotDetail(itinerary.sku)"
      />
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
    toSpotDetail(sku) {
      this.$router.push(`/merchant/spot/${sku}`);
    },
  },
};
</script>
