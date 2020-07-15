<template>
  <div class="itinerary-card">
    <data-card
      :data="itineraryData"
      otherIcon="tag"
      class="border-bottom-gray"
    />

    <div class="mt-0 more-itinerary-card bg-white p-3 border-gray-young">
      <div class="bold">Description</div>
      <div class="description-detail font-size-14">
        {{ itinerary.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '../../../utils/filter';
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
        name: this.itinerary.name,
        image: this.itinerary.image,
        location: this.itinerary.location,
        other: formatPrice(this.itinerary.price, true, true),
        rating: this.itinerary.rating || null,
      };
    },
  },
};
</script>
