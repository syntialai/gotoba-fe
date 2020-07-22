<template>
  <div class="card-spot bg-white p-3 mb-2">
    <b-media tag="li" vertical-align="center">
      <template v-slot:aside>
        <b-img
          :src="imageUrl"
          rounded
          width="64"
          :alt="itinerary.name"
        ></b-img>
      </template>
      <h5 class="m-0 font-color-black-87">{{ itinerary.name }}</h5>
      <p class="mb-0 font-color-black-60">
        {{ itinerary.address }}
      </p>
      <div class="review d-flex align-items-center" v-if="itinerary.rate">
        <rating :rate="itinerary.rate" />
        <div class="rating-text font-size-14 font-color-black-60">
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
