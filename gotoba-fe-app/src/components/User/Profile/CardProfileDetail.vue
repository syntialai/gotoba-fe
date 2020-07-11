<template>
  <div class="card-profile-detail bg-white p-3">
    <b-card
      :img-src="image"
      img-alt="Card image"
      img-left class="mb-3 border-none"
    >
      <b-card-text>
        <h6>{{ name }}</h6>
        <span>{{ location }}</span>
        <Rating :rate="rating" :fontSize="10" />
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
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
};
</script>
