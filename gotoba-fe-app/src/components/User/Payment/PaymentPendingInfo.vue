<template>
  <div class="payment-pending-info bg-color-orange-accent">
    <div class="do-payment align-center font-size-20 p-3">
      <div class="font-color-blue-primary semibold">
        Do payment on
      </div>
      <div class="bold">{{ time }}</div>
    </div>
    <div class="payment-info border-top-gray-young p-3">
      Payment via transfer bank {{ bankName }}
    </div>
    <div class="d-flex justify-content-between font-color-black-60">
      <div class="account-label">{{accountLabel}} Number</div>
      <div class="account-number">
        <div class="number">{{ accountNumber }}</div>
        <div class="name" v-if="accountLabel == 'Bank'">(A.N. {{ AN }})</div>
        <div class="copy"><a href="">COPY</a></div>
      </div>
    </div>
    <div class="how-to-pay">
      <a href="">How to Pay?</a>
    </div>
    <b-button
      class="w-100"
      href=""
      v-if="accountLabel == 'Bank'"
    >
      UPLOAD TRANSFER BILLS
    </b-button>
  </div>
</template>

<script>
import formatPrice from '../../../utils/filter';

export default {
  name: 'PaymentPendingInfo',
  methods: {
    formatPrice,
  },
};
</script>
