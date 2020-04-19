<template>
  <div class="history-details">
    <div class="order-details bg-white p-2">
      <div class="title w-100 border-bottom-gray-young">
        <h3>Order Details</h3>
      </div>
      <div class="details">
        <div
          class="d-flex justify-content-between font-size-14 font-color-black-60"
          v-for="info in orderInfo"
          :key="info.name.toLowerCase().replace(' ','-')"
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

    <div class="order-items">
      <div class="title w-100 border-bottom-gray-young">
        <h3>Order Item(s)</h3>
      </div>
      <div class="order-items-group">
        <OrderItems
          v-for="item in items"
          :key="item.name.toLowerCase().replace(' ','-')"
          :name="item.name"
          :image="item.image"
          :price="item.price"
          :discountPrice="item.discountPrice"
        />
      </div>
    </div>

    <div class="payment-details">
      <div class="title w-100 border-bottom-gray-young">
        <h3>Payment Details</h3>
      </div>
      <PaymentDetail price="" discount="" />
    </div>
  </div>  
</template>

<script>
import PaymentDetail from '@/components/User/Payment/PaymentDetail.vue';
import OrderItems from '@/components/User/OrderItems.vue';

export default {
  name: 'HistoryDetails',
  data() {
    return {
      orderInfo: [
        {
          name: 'Order Id', value: 'ID #abc',
        },
        {
          name: 'Transaction Date', value: 'Wed, Feb 12 2020',
        },
        {
          name: 'Purchase Status', value: 'Payment Received',
        },
        {
          name: 'Payment Method', value: 'Bank Transfer - Bank BCA',
        },
      ],
      items: [
        {
          name: 'E-ticket Danau Toba',
          image: 'https://www.pegipegi.com/travel/wp-content/uploads/2017/11/shutterstock_521143462.jpg',
          price: 100000,
          discountPrice: 50000,
        },
      ],
    };
  },
  components: {
    PaymentDetail,
    OrderItems,
  },
};
</script>
