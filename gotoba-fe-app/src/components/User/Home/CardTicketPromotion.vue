<template>
  <router-link :to="goToTicketDetail">
    <b-card class="card-home box-shadow mr-3 mb-3">
      <b-card-img
        :src="imageUrl"
        :alt="name"
        width="100%"
        class="object-fit_fill"
        top
      ></b-card-img>
      <b-card-title class="font-size-14 font-color-black-87 mt-2 mb-1 px-2">
        {{ name }}
      </b-card-title>
      <b-card-text class="font-size-14 px-2">
        <span class="bold pr-2 font-color-accent-orange">{{ promotionPrice }}</span>
        <span class="strikethrough font-color-black-60">{{ actualPrice }}</span>
      </b-card-text>
    </b-card>
  </router-link>
</template>

<script>
import api from '../../../api/api';
import { formatPrice } from '../../../utils/filter';

export default {
  name: 'CardTicketPromotion',
  props: {
    sku: String,
    name: String,
    image: String,
    price: Number,
    discount: Number,
    expiredDate: String,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
    promotionPrice() {
      const newPrice = (this.price - this.discount).toString();
      return formatPrice(newPrice);
    },
    actualPrice() {
      return formatPrice(this.price.toString());
    },
    goToTicketDetail() {
      return `/ticket/${this.sku}`;
    },
  },
};
</script>
