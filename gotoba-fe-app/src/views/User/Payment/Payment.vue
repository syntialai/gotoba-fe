<template>
  <div class="payment">
    <div class="order-items p-3 bg-white">
      <div class="title w-100 border-bottom-gray-young">
        <h5>Order Item(s)</h5>
      </div>
      <div class="order-items-group" v-if="orderData && orderData.length > 0">
        <div class="order-item-detail"
          v-for="item in orderData"
          :key="item.title"
        >
          <order-items
            :name="item.title"
            :image="item.image"
            :price="item.price"
            :discountPrice="item.discount"
            :quantity="item.quantity"
          />
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
        :total="total"
      />
    </div>

    <bottom-nav-payment
      :totalItem="orderTotal.item"
      :totalPrice="total"
      innerButton="BUY NOW"
      :buttonFunc="pay"
      :loading="loading"
      class="fixed-bottom"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../../../api/api';
import { toast } from '../../../utils/tool';
import OrderItems from '../../../components/User/OrderItems.vue';
import PaymentDetail from '../../../components/User/Payment/PaymentDetail.vue';
import BottomNavPayment from '../../../components/User/Payment/BottomNavPayment.vue';

export default {
  name: 'Payment',
  components: {
    OrderItems,
    PaymentDetail,
    BottomNavPayment,
  },
  computed: {
    ...mapGetters(['orderData', 'orderTotal', 'userSku']),
    total() {
      return this.orderTotal.price - this.orderTotal.discount;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async pay() {
      const data = {
        total: this.total,
        status: 'WAITING',
        merchantSku: this.orderData.map((item) => item.merchantSku).toString(),
        orderSku: this.orderData.map((item) => item.sku).toString(),
      };

      this.loading = true;

      try {
        const paymentRes = await api.PostPayment(this.userSku, data);
        this.orderData.forEach(async (order) => {
          await api.CheckoutOrder(order.sku);
        });

        this.loading = false;
        this.goToThanksPage(paymentRes.data.sku);
      } catch (err) {
        this.loading = false;
        toast('Error while checkout item!');
      }
    },
    goToThanksPage(sku) {
      this.$router.push(`/order/thankyou/${sku}`);
    },
  },
};
</script>
