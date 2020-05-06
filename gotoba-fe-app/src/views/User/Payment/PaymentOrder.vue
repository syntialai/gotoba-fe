<template>
  <div class="payment-order">
    <div class="information p-2">
      <div class="image-waiting p-4 w-100">
        <img src="@/assets/img/Waiting.png" alt="Waiting">
      </div>

      <div class="align-center font-color-black-60">
        <div class="thank-you mb-3">
          Thank you for shopping at gotoba!
        </div>
        <div class="do-payment mt-2 mb-1">
          Do payment before
        </div>
        <div class="payment-deadline font-color-black-87 bold mb-3">
          {{ paymentTime }}
        </div>
        <div class="complete-payment mb-1">
          Have you completed the payment? Upload your payment bill or
          Check your payment status at
          <a :href="['/history/' + paymentId]">History</a>
        </div>
      </div>
    </div>

    <div class="order-bank font-color-black-60 p-2">
      <div class="transfer-info">
        <div class="transfer-label">
          Transfer to bank account:
        </div>
        <div class="d-flex justify-content-between">
          <div class="bank-number">
            <img :src="bankImg" alt="bank" />
            <div class="number semibold font-color-black-87">
              {{ bankNumber }}
            </div>
          </div>
          <div class="copy">
            <a href="">COPY</a>
          </div>
        </div>
      </div>
      <div class="how-to-pay">
        <a href="">How to Pay?</a>
      </div>
    </div>

    <div class="payment-details">
      <div class="title w-100 border-bottom-gray-young">
        <span class="font-color-black-87">Payment details:</span>
      </div>
      <payment-detail price="" discount="" />
    </div>

    <b-button class="w-100 btn custom-btn-primary">SHOW ORDER DETAILS</b-button>
    <b-button class="w-100 btn btn-light">BACK TO HOME</b-button>
  </div>
</template>

<script>
import { formatPrice } from '@/utils/filter';
import PaymentDetail from '../../../components/User/Payment/PaymentDetail.vue';

export default {
  name: 'PaymentOrder',
  component: {
    PaymentDetail,
  },
  props: {
    paymentId: String,
    paymentTime: String,
    paymentMethod: String,
    bankImg: String,
    bankNumber: String,
    totalPayment: String,
  },
  method: {
    formatPrice,
  },
};
</script>
