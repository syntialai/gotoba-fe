<template>
  <div class="history-details">
    <div class="order-details bg-white p-3 my-2">
      <div class="title w-100 border-bottom-gray-young">
        <h6 class="font-color-black-87">Order Details</h6>
      </div>
      <b-overlay
        id="overlay-order-detail"
        :show="paymentDataBySku === 'undefined'"
        variant="light"
        :opacity="0.6"
        blur="2px"
        rounded="sm"
      >
        <div class="detail mt-2" v-if="paymentDataBySku">
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
      </b-overlay>
    </div>

    <div class="order-items p-3 bg-white my-1">
      <div class="title w-100 border-bottom-gray-young">
        <h6 class="font-color-black-87">Order Item(s)</h6>
      </div>
      <b-overlay
        id="overlay-order"
        :show="filteredOrderData === 'undefined'"
        variant="light"
        :opacity="0.6"
        blur="2px"
        rounded="sm"
      >
        <div
          v-if="filteredOrderData.length > 0"
          class="order-items-group"
        >
          <order-items
            v-for="item in filteredOrderData"
            :key="item.title"
            :name="item.title"
            :image="item.image"
            :price="item.price"
            :quantity="item.quantity"
            :discountPrice="item.discount"
          />
        </div>
      </b-overlay>
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
import { formatDate } from '../../../utils/filter';
import PaymentDetail from '../../../components/User/Payment/PaymentDetail.vue';
import OrderItems from '../../../components/User/OrderItems.vue';

export default {
  name: 'HistoryDetails',
  components: {
    PaymentDetail,
    OrderItems,
  },
  computed: {
    ...mapGetters(['paymentDataBySku', 'filteredOrderData', 'orderTotal']),
    orderInfo() {
      return [
        {
          name: 'Order Id', value: this.paymentDataBySku.id,
        },
        {
          name: 'Transaction Date',
          value: formatDate(new Date(this.paymentDataBySku.createdAt)),
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
    ...mapActions(['getPaymentBySku', 'getSomeOrderData', 'setOrderTotal']),
  },
  watch: {
    paymentDataBySku() {
      console.log(this.paymentDataBySku);
      if (this.paymentDataBySku) {
        this.getSomeOrderData(this.paymentDataBySku.orderSku.split(','));
        console.log(this.paymentDataBySku.orderSku.split(','));
        console.log('filter', this.filteredOrderData);
      }
    },
  },
};
</script>
