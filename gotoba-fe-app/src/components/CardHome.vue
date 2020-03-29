<template>
  <b-card
    :img-src="[image]"
    :img-alt="['Image-' + name]"
    img-top
    class="box-shadow"
  >
    <b-card-title class="font-size-12 font-color-black-87 semibold">
      {{ name }}
    </b-card-title>
    <b-card-text class="font-size-8 font-color-black-60">
      {{ location }}
    </b-card-text>
    <b-card-text class="pl-2 font-size-8 text-muted">
      <Rating :rate="[rating]" fontSize="8" />
      <span class="font-color-black-87 semibold pl-1">
        ({{ rating }})
      </span>
    </b-card-text>
    </b-card>
</template>

<script>
import Rating from '@/components/Rating.vue';

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
};
</script>
