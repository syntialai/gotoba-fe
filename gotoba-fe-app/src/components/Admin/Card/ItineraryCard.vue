<template>
  <router-link :to="goToItineraryDetail">
    <div class="itinerary-card box-shadow">
      <data-card
        :data="itineraryData"
        otherIcon="tag"
        class="border-bottom-gray-young"
      />

      <div class="mt-0 more-itinerary-card bg-white p-3 border-gray-young">
        <div class="semibold font-color-black-87">Description</div>
        <div class="description-detail font-size-14 font-color-black-60">
          {{ itinerary.description }}
        </div>
      </div>
    </div>
  </router-link>
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
        location: this.itinerary.address,
        other: formatPrice(this.itinerary.price.toString(), true, true),
        rating: this.itinerary.rating || null,
      };
    },
    goToItineraryDetail() {
      return `/admin/itinerary/${this.itinerary.sku}`;
    },
  },
};
</script>
