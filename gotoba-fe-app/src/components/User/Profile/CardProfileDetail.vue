<template>
  <div class="card-profile-detail bg-white p-3">
    <b-card
      :img-src="imageUrl"
      img-alt="Card image"
      img-left
      class="mb-3 border-none object-fit_cover"
      img-width="80"
      img-height="80"
    >
      <b-card-text>
        <h6>{{ name }}</h6>
        <span>{{ location }}</span>
        <Rating v-if="rating" :rate="rating" :fontSize="10" />
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import api from '../../../api/api';
import Rating from '../../Partial/Rating.vue';

export default {
  name: 'CardProfileDetail',
  props: {
    name: String,
    location: String,
    rating: Number,
    image: String,
  },
  components: {
    Rating,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
  },
};
</script>
