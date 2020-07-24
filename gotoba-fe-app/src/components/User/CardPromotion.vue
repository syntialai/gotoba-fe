<template>
  <div class="card-promotion">
    <router-link :to="link">
      <b-card
        :img-src="imageUrl"
        :img-alt="'image' + sku"
        img-left
        class="mb-3 border-square-5"
      >
        <b-card-sub-title class="font-color-black-87">
          {{ title }}
        </b-card-sub-title>
        <b-card-text>
          {{ info }}
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
    info: String,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
    link() {
      return `/${this.route}'/${this.sku}`;
    },
  },
};
</script>
