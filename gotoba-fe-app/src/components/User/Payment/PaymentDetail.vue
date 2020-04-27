<template>
  <div class="details font-color-black-60">
    <div class="d-flex justify-content-between">
      <div class="details-name">Price (estimated)</div>
      <div class="details-value semibold">
        {{ formatPrice(price, true) }}
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="details-name">Promo discount</div>
      <div class="details-value semibold">
        {{ formatPrice(discount, true) }}
      </div>
    </div>
    <div class="d-flex justify-content-between bold border-top-gray-young">
      <div class="details-name">Total Payment</div>
      <div class="details-value font-color-blue-secondary">
        {{ formatPrice(price - discount, true) }}
      </div>
    </div>
  </div>
</template>

<script>
import formatPrice from '@/utils/filter';

export default {
  name: 'PaymentDetail',
  props: {
    price: String,
    discount: String,    
  },
  methods: {
    formatPrice,
  },
};
</script>