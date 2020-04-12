<template>
  <a :href="'/' + route + '/' + sku">
    <b-card
      :img-src="imageSrc"
      :img-alt="'image' + sku"
      img-left
      class="mb-3 border-square-5"
    >
      <b-card-sub-title class="font-color-blue-primary">
        {{ title }}
      </b-card-sub-title>
      <b-card-text>
        <div>
          <font-awesome-icon :icon="icon1" class="icon-gradient"
          ></font-awesome-icon>
          <div class="value">{{ value1 }}</div>
        </div>
        <div>
          <font-awesome-icon :icon="icon2" class="icon-gradient"
          ></font-awesome-icon>
          <div class="value">{{ value2 }}</div>
        </div>
        <Rating :rate="rating" fontSize="14" />
      </b-card-text>
    </b-card>
  </a>
</template>

<script>
import Rating from '@/components/Rating.vue';

export default {
  name: 'CardSearchResult',
  components: {
    Rating,
  },
  props: {
    sku: String,
    route: String,
    imageSrc: String,
    title: String,
    icon1: String,
    icon2: String,
    value1: String,
    value2: String,
    rating: String,
  },
};
</script>
