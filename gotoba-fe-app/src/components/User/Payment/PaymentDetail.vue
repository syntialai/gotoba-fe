<template>
  <div class="payment-detail font-color-black-60 mb-3">
    <div class="d-flex justify-content-between pt-3 pb-1">
      <div class="details-name">Price (estimated)</div>
      <div class="details-value semibold">
        {{ prices }}
      </div>
    </div>
    <div class="d-flex justify-content-between pb-3">
      <div class="details-name">Promo discount</div>
      <div class="details-value semibold">
        {{ discounts }}
      </div>
    </div>
    <div class="d-flex justify-content-between bold border-top-gray-young pt-2">
      <div class="details-name">Total Payment</div>
      <div class="details-value font-color-blue-secondary">
        {{ totals }}
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
    total: Number,
  },
  computed: {
    prices() {
      return formatPrice(this.price, true);
    },
    discounts() {
      return formatPrice(this.discount, true);
    },
    totals() {
      return formatPrice(this.total, true);
    },
  },
};
</script>
