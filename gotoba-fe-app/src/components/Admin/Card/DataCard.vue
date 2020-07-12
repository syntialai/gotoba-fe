<template>
  <div class="data-card">
    <b-card
      :img-src="data.image"
      :img-alt="data.location"
      img-left
      class="p-2"
    >
      <b-card-body>
        <b-card-sub-title class="bold font-color-blue-secondary">
          {{ data.location }}
        </b-card-sub-title>

        <div class="other d-flex align-items-center">
          <div class="other-icon icon-gradient">
            <font-awesome-icon :icon="otherIcon"></font-awesome-icon>
          </div>
          <div class="other-text pl-3">
            {{ data.other }}
          </div>
        </div>

        <div class="location d-flex align-items-center">
          <div class="location-icon icon-gradient">
            <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
          </div>
          <div class="location-text pl-3">
            {{ data.location }}
          </div>
        </div>

        <div class="rating" v-if="data.rating">
          <rating :rate="data.rating" :fontSize="14" />
          <div class="rate-number font-size-14 semibold">
            ({{ data.rating }})
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Rating from '../../Partial/Rating.vue';

export default {
  name: 'DataCard',
  props: {
    data: Object,
    otherIcon: String,
  },
  components: {
    Rating,
  },
};
</script>
