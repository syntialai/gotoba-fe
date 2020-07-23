<template>
  <div class="payment">
    <div class="order-items p-3 bg-white">
      <div class="title w-100 border-bottom-gray-young">
        <h5>Order Item(s)</h5>
      </div>
      <div class="order-items-group" v-if="orderData && orderData.length > 0">
        <div class="order-item-detail"
          v-for="item in orderData"
          :key="item.name"
        >
          <div class="order-item-info">
            <order-items
              :name="item.name"
              :image="item.image"
              :price="item.price"
              :discountPrice="item.discountPrice"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="payment-details mt-3 p-3 bg-white">
      <div class="title w-100 border-bottom-gray-young">
        <h5>Payment Details</h5>
      </div>
      <payment-detail
        :price="orderTotal.price"
        :discount="orderTotal.discount"
      />
    </div>

    <div class="payment-method mt-3 p-3 bg-white">
      <div class="title w-100 border-bottom-gray-young">
        <h5>Payment Method</h5>
      </div>
      <payment-method />
    </div>

    <bottom-nav-payment
      :totalItem="orderTotal.item"
      :totalPrice="total"
      innerButton="BUY NOW"
      :buttonFunction="pay"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '../../../api/api';
import OrderItems from '../../../components/User/OrderItems.vue';
import PaymentDetail from '../../../components/User/Payment/PaymentDetail.vue';
import PaymentMethod from '../../../components/User/Payment/PaymentMethod.vue';
import BottomNavPayment from '../../../components/User/Payment/BottomNavPayment.vue';

export default {
  name: 'Payment',
  components: {
    OrderItems,
    PaymentDetail,
    PaymentMethod,
    BottomNavPayment,
  },
  computed: {
    ...mapGetters(['orderData', 'orderTotal', 'userSku']),
    total() {
      return this.orderTotal.price - this.orderTotal.discount;
    },
  },
  methods: {
    ...mapActions(['setOrderData']),
    async pay() {
      const data = {
        total: this.total,
        status: 'WAITING',
        merchantSku: this.orderData.merchantSku,
        orderId: 2,
      };

      const paymentRes = await api.PostPayment(this.userSku, data);
      const orderRes = await api.CheckoutOrder(this.orderData.sku);

      if (!paymentRes.error && !orderRes.error) {
        this.goToThanksPage(paymentRes.data.sku);
      }
    },
    goToThanksPage(sku) {
      this.$router.push(`/order/thankyou/${sku}`);
    },
  },
};
</script>
