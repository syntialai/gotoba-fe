<template>
  <div class="card-promotion">
    <router-link :to="link">
      <b-card
        :img-src="imageUrl"
        :img-alt="'image' + sku"
        img-left
        img-width="80"
        class="mb-3"
      >
        <b-card-sub-title class="p-2 font-color-black-87">
          {{ title }}
        </b-card-sub-title>
        <b-card-text class="font-color-black-60 px-2">
          {{ description }}
        </b-card-text>
      </b-card>
    </router-link>
  </div>
</template>

<script>
import api from '../../api/api';

export default {
  name: 'CardPromotion',
  props: {
    route: String,
    sku: String,
    image: String,
    title: String,
    description: String,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
    link() {
      return `/${this.route}/${this.sku}`;
    },
  },
};
</script>
