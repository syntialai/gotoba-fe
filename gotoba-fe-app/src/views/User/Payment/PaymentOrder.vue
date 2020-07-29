<template>
  <div class="payment-order p-2">
    <div class="information p-2">
      <div class="image-waiting p-4 w-100">
        <img
          src="@/assets/img/illustrate/Waiting.png"
          alt="Waiting"
          width="100%"
        >
      </div>

      <div class="align-center font-color-black-60">
        <div class="thank-you mb-3">
          Thank you for shopping at gotoba!
        </div>
        <div class="complete-payment mb-1">
          Check your payment/order status at
          <router-link :to="goToHistory">
            History
          </router-link>
        </div>
      </div>
    </div>

    <div class="payment-details my-3 mx-2">
      <div class="title w-100 border-bottom-gray-young">
        <span class="font-color-black-87">
          Payment details:
        </span>
      </div>
      <payment-detail
        :price="orderTotal.price"
        :discount="orderTotal.discount"
        :total="total"
      />
    </div>

    <div class="p-3 px-2">
      <b-button
        class="w-100 custom-btn-primary my-2"
        :to="goToHistory"
      >
        SHOW ORDER DETAILS
      </b-button>
      <b-button
        class="w-100 custom-btn-gray"
        to="/"
      >
        BACK TO HOME
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PaymentDetail from '../../../components/User/Payment/PaymentDetail.vue';

export default {
  name: 'PaymentOrder',
  components: {
    PaymentDetail,
  },
  computed: {
    ...mapGetters(['orderTotal', 'paymentDataBySku']),
    goToHistory() {
      return `/history/details/${this.paymentDataBySku.sku}`;
    },
    total() {
      return this.orderTotal.price - this.orderTotal.discount;
    },
  },
  created() {
    this.getPaymentBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getPaymentBySku']),
  },
};
</script>
