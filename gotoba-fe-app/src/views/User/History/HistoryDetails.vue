<template>
  <div class="history-details">
    <div class="order-details bg-white p-3 my-2">
      <div class="title w-100 border-bottom-gray-young">
        <h6 class="font-color-black-87">Order Details</h6>
      </div>
      <div class="detail mt-2">
        <div
          class="d-flex justify-content-between font-size-14 font-color-black-60 mb-2"
          v-for="info in orderInfo"
          :key="info.name"
        >
          <div class="details-name">
            {{ info.name }}
          </div>
          <div class="details-value semibold">
            {{ info.value }}
          </div>
        </div>
      </div>
    </div>

    <div class="order-items p-3 bg-white my-1">
      <div class="title w-100 border-bottom-gray-young">
        <h6 class="font-color-black-87">Order Item(s)</h6>
      </div>
      <div class="order-items-group">
        <order-items
          v-for="item in orderDataBySku"
          :key="item.title"
          :name="item.title"
          :image="item.image"
          :price="item.price"
          :quantity="item.quantity"
          :discountPrice="item.discount"
        />
      </div>
    </div>

    <div class="payment-details p-3 bg-white my-2">
      <div class="title w-100 border-bottom-gray-young">
        <h6 class="font-color-black-87">Payment Details</h6>
      </div>
      <payment-detail
        :price="orderTotal.price"
        :discount="orderTotal.discount"
        :total="orderTotal.price - orderTotal.discount"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatPrice } from '../../../utils/filter';
import PaymentDetail from '../../../components/User/Payment/PaymentDetail.vue';
import OrderItems from '../../../components/User/OrderItems.vue';

export default {
  name: 'HistoryDetails',
  components: {
    PaymentDetail,
    OrderItems,
  },
  computed: {
    ...mapGetters(['paymentDataBySku', 'orderDataBySku', 'orderTotal']),
    orderInfo() {
      return [
        {
          name: 'Order Id', value: this.orderDataBySku.id,
        },
        {
          name: 'Transaction Date', value: formatPrice(this.paymentDataBySku.created),
        },
        {
          name: 'Purchase Status', value: this.paymentDataBySku.status,
        },
      ];
    },
  },
  created() {
    this.getPaymentBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getPaymentBySku', 'getOrderDataBySku', 'setOrderTotal']),
  },
};
</script>
