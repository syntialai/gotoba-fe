<template>
  <div class="items">
    <b-card no-body
      block
      class="pr-2 border-none pt-3"
      :img-src="imageUrl"
      img-left
      :img-height="80"
      :img-width="80"
    >
      <b-card-body class="ml-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="info">
            <b-card-title class="font-color-black-87 font-size-16">
              {{ name }}
            </b-card-title>
            <b-card-text>
              <span
                :class="{
                  'strikethrough': discountPrice > 0,
                  'normal-price font-color-black-60': price > 0
                }"
              >
                {{ prices }}
              </span>
              <span v-if="discountPrice > 0" class="discount-price font-color-red semibold">
                {{ discounts }}
              </span>
            </b-card-text>
          </div>
          <div class="quantity font-color-blue-primary mb-3 w-25 align-right semibold">
            {{ quantities }}
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import api from '../../api/api';
import { formatPrice } from '../../utils/filter';

export default {
  name: 'OrderItems',
  props: {
    name: String,
    image: String,
    price: Number,
    discountPrice: {
      type: Number,
      default: 0,
    },
    quantity: Number,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
    prices() {
      return formatPrice(this.price);
    },
    discounts() {
      return formatPrice(this.discountPrice);
    },
    quantities() {
      let count = `${this.quantity} pc`;

      if (this.quantity > 1) {
        count += 's';
      }

      return count;
    },
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
