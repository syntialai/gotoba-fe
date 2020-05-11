<template>
  <div class="itinerary-card">
    <b-card
      :img-src="itinerary.image"
      :img-alt="itinerary.location"
      img-left
      class="p-2"
    >
      <b-card-body>
        <b-card-subtitle class="bold font-color-blue-secondary">
          {{ itinerary.location }}
        </b-card-subtitle>

        <div class="location d-flex align-items-center">
          <div class="location-icon icon-gradient">
            <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
          </div>
          <div class="location-text pl-3">
            {{ itinerary.location }}
          </div>
        </div>

        <div class="price d-flex align-items-center">
          <div class="price-icon icon-gradient">
            <font-awesome-icon icon="tag"></font-awesome-icon>
          </div>
          <div class="price-text pl-3">
            {{ itinerary.price }}
          </div>
        </div>

        <div class="rating">
          <rating rate="" :fontSize="14" />
          <div class="rate-number font-size-14 semibold">
            ({{ itinerary.rating }})
          </div>
        </div>
      </b-card-body>

      <template v-slot:footer>
        <div class="bold">Description</div>
        <div class="description">
          {{ itinerary.description }}
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import Rating from '../../Partial/Rating.vue';

export default {
  name: 'ItineraryCard',
  props: {
    itinerary: Object,
  },
  components: {
    Rating,
  },
};
</script>
