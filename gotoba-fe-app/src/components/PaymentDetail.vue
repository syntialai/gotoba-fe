<template>
  <div class="details font-color-black-60">
    <div class="d-flex justify-content-between">
      <div class="details-name">Price (estimated)</div>
      <div class="details-value semibold">
        {{ price }}
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="details-name">Promo discount</div>
      <div class="details-value semibold">
        {{ discount }}
      </div>
    </div>
    <div class="d-flex justify-content-between bold border-top-gray-young">
      <div class="details-name">Total Payment</div>
      <div class="details-value semibold">
        {{ priceTotal }}
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
    priceTotal: String,
  },
  method: {
    format(price) {
      return new Intl.NumberFormat('id').format(parseInt(price)) + '.00';
    },
  },
};
</script>