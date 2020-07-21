<template>
  <b-card class="card-home box-shadow mr-3 mb-3">
    <b-card-img
      :src="imageUrl"
      :alt="'Image-' + name"
      width="100%"
      class="object-fit_fill"
      top
    ></b-card-img>
    <b-card-title class="font-size-14 font-color-black-87 semibold mt-2 mb-1">
      {{ name }}
    </b-card-title>
    <b-card-text class="font-size-12 font-color-black-60">
      {{ location }}
    </b-card-text>
    <b-card-text class="pl-2 font-size-12 text-muted" v-if="rating">
      <rating :rate="rating" :fontSize="8" />
      <span class="font-color-black-87 semibold pl-1">
        ({{ rating }})
      </span>
    </b-card-text>
    </b-card>
</template>

<script>
import api from '../../../api/api';
import Rating from '../../Partial/Rating.vue';

export default {
  name: 'CardHome',
  props: {
    name: String,
    image: String,
    location: String,
    rating: Number,
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

<style lang="scss">
.card-home {
  min-width: 100px;
  max-width: 200px;
}
</style>
