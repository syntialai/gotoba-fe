<template>
  <div class="items">
    <b-card no-body
      block
      class="pr-2"
      :img-src="imageUrl"
      :img-alt="name"
      img-left
    >
      <b-card-body>
        <b-card-title class="font-color-black-87">
          {{ name }}
        </b-card-title>
        <b-card-text>
          <span
            :class="['normal-price font-color-black-60 ' + { strikethrough: discount }]"
          >
            {{ formatPrice(price) }}
          </span>
          <span v-if="discount" class="discount-price font-color-red semibold">
            {{ formatPrice(discountPrice) }}
          </span>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import api from '../../api/api';
import { formatPrice } from '../../utils/filter';

export default {
  name: 'Order Items',
  props: {
    name: String,
    image: String,
    price: String,
    discountPrice: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      discount: this.discountPrice !== 0,
    };
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
  },
  methods: {
    formatPrice,
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 48px;

  @media screen and (min-width: 425px) {
    width: 60px;
  }

  @media screen and (min-width: 768px) {
    width: 75px;
  }
}
</style>
