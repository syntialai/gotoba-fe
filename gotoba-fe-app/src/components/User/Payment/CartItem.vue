<template>
  <div class="cart-item">
    <div class="d-flex">
      <b-img :src="imageUrl" :alt="name" />
      <div class="cart-item__info pl-3">
        <div class="cart-item__size">
          <span class="item__name font-color-black-87 d-block">
            {{ name }}
          </span>
          <span
            :class="['normal-price ' + { strikethrough: discount }]"
          >
            {{ formatPrice(price) }}
          </span>
          <span v-if="discount" class="discount-price font-color-red semibold">
            {{ formatPrice(discountPrice) }}
          </span>
        </div>
        <b-form-spinbutton
          id="item"
          class="mt-2"
          v-model="itemCount"
          @change="updateQuantity"
          min="1"
          max="50"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../api/api';
import { formatPrice } from '../../../utils/filter';

export default {
  name: 'CartItem',
  props: {
    name: String,
    image: String,
    price: Number,
    discountPrice: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
  },
  data() {
    return {
      discount: this.discountPrice !== 0,
      itemCount: this.quantity,
    };
  },
  methods: {
    formatPrice,
    updateQuantity() {
      this.$emit('update:quantity', this.itemCount);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 60px;
  height: 60px;

  @media screen and (min-width: 425px) {
    width: 80px;
    height: 80px;
  }

  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
}

.cart-item__size {
  height: 60px;

  @media screen and (min-width: 425px) {
    height: 80px;
  }

  @media screen and (min-width: 768px) {
    height: 100px;
  }
}
</style>
