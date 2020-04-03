<template>
  <div class="details font-color-black-60">
    <div class="d-flex justify-content-between">
      <div class="details-name">Price (estimated)</div>
      <div class="details-value semibold">
        {{ format(price) }}
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="details-name">Promo discount</div>
      <div class="details-value semibold">
        {{ format(discount) }}
      </div>
    </div>
    <div class="d-flex justify-content-between bold border-top-gray-young">
      <div class="details-name">Total Payment</div>
      <div class="details-value font-color-blue-secondary">
        {{ format(price - discount) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDetail',
  props: {
    price: String,
    discount: String,    
  },
  method: {
    format(price) {
      return new Intl.NumberFormat('id').format(parseInt(price)) + '.00';
    },
  },
};
</script>