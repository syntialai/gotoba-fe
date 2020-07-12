<template>
  <div class="itinerary-card">
    <data-card
      :data="itineraryData"
      otherIcon="tag"
    />

    <div class="more-itinerary-card">
      <div class="bold">Description</div>
      <div class="description-detail font-size-14">
        {{ itinerary.description }}
      </div>
    </div>
  </div>
</template>

<script>
import DataCard from './DataCard.vue';

export default {
  name: 'ItineraryCard',
  components: {
    DataCard,
  },
  props: {
    itinerary: Object,
  },
  computed: {
    itineraryData() {
      return {
        image: this.itinerary.image,
        location: this.itinerary.location,
        other: this.itinerary.harga,
        rating: this.itinerary.rating || null,
      };
    },
  },
};
</script>
