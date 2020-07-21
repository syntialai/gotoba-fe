<template>
  <router-link :to="'/' + category + '/' + sku">
    <b-card
      :img-src="imageUrl"
      :img-alt="'image' + sku"
      img-left
      class="mb-3 border-square-5"
    >
      <b-card-sub-title class="font-color-blue-primary">
        {{ title }}
      </b-card-sub-title>
      <b-card-text>
        <div class="d-flex align-items-center p-2">
          <font-awesome-icon :icon="icon1" class="icon-gradient mr-2"
          ></font-awesome-icon>
          <div class="value font-color-black-60">{{ value1 }}</div>
        </div>
        <div class="d-flex align-items-center p-2">
          <font-awesome-icon :icon="icon2" class="icon-gradient mr-2"
          ></font-awesome-icon>
          <div class="value font-color-black-60">{{ value2 }}</div>
        </div>
        <rating v-if="rating" :rate="rating" :fontSize="14" />
      </b-card-text>
    </b-card>
  </router-link>
</template>

<script>
import api from '../../../api/api';
import Rating from '../../Partial/Rating.vue';

export default {
  name: 'CardSearchResult',
  components: {
    Rating,
  },
  props: {
    sku: String,
    category: String,
    imageSrc: String,
    title: String,
    icon1: String,
    icon2: String,
    value1: String,
    value2: String,
    rating: {
      type: Number,
      default: null,
    },
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.imageSrc);
    },
  },
};
</script>
