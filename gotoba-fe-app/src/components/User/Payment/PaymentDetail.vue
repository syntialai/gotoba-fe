<template>
  <div class="payment-detail font-color-black-60">
    <div class="d-flex justify-content-between">
      <div class="details-name">Price (estimated)</div>
      <div class="details-value semibold">
        {{ formatPrice(this.price, true) }}
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="details-name">Promo discount</div>
      <div class="details-value semibold">
        {{ formatPrice(this.discount, true) }}
      </div>
    </div>
    <div class="d-flex justify-content-between bold border-top-gray-young">
      <div class="details-name">Total Payment</div>
      <div class="details-value font-color-blue-secondary">
        {{ formatPrice(this.price - this.discount, true) }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '../../../utils/filter';

export default {
  name: 'PaymentDetail',
  props: {
    price: Number,
    discount: Number,
  },
  methods: {
    formatPrice,
  },
};
</script>
