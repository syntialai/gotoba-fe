<template>
  <div class="itinerary-card">
    <data-card :data="itinerary" otherIcon="tag" />

    <div class="more-itinerary-card">
      <div class="bold">Description</div>
      <div class="description-detail font-size-14">
        {{ itinerary.description }}
      </div>
      <div class="edit-button w-100 d-flex justify-content-end">
        <b-button
          class="custom-btn-primary"
          @click="this.$router.push(id)"
        >EDIT</b-button>
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
