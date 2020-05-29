<template>
  <div class="itinerary-card">
    <data-card :data="itinerary" otherIcon="tag" />

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
};
</script>
