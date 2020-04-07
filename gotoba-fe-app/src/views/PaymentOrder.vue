<template>
  <div class="payment-order">
    <NavigationBack title="Payment" />

    <div class="information p-2">
      <div class="image-waiting p-4 w-100">
        <img src="@/assets/Waiting.png" alt="Waiting">
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
          Have you completed the payment? Check your payment status at
          <a :href="['/history/' + paymentId]">History</a>
        </div>
      </div>
    </div>

    <div class="order-bank font-color-black-60 p-2">
      <div class="transfer-info">
        <div class="transfer-label">
          Transfer to {{ paymentMethod }} number:
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
      <div class="price-info">
        <div class="price-label">Total payment:</div>
        <div class="d-flex justify-content-between">
          <div class="price-number">{{ formatPrice(totalPayment, true, true) }}</div>
          <div class="show-order">
            <a :href="['/history/' + paymentId]">Show Order Details</a>
          </div>
        </div>
      </div>
    </div>

    <div class="payment-guide">
      
    </div>
  </div>
</template>

<script>
import NavigationBack from '@/components/NavigationBack.vue';
import formatPrice from '@/utils/filter';

export default {
  name: 'PaymentOrder',
  component: {
    NavigationBack,
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
