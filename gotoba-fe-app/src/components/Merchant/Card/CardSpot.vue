<template>
  <div class="card-spot bg-white py-2 px-3 mb-2">
    <b-media tag="li" vertical-align="center">
      <template v-slot:aside>
        <b-img
          :src="imageUrl"
          rounded
          width="64"
          :alt="itinerary.name"
        ></b-img>
      </template>
      <h5 class="m-0">{{ itinerary.name }}</h5>
      <p class="mb-0">
        {{ itinerary.address }}
      </p>
      <div class="review d-flex align-items-center">
        <rating :rate="itinerary.rate" />
        <div class="rating-text font-size-14">
          ({{ itinerary.rate }})
        </div>
      </div>
    </b-media>
  </div>
</template>

<script>
import api from '../../../api/api';
import Rating from '../../Partial/Rating.vue';

export default {
  name: 'CardSpot',
  components: {
    Rating,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.itinerary.image);
    },
  },
  props: {
    itinerary: Object,
  },
};
</script>
