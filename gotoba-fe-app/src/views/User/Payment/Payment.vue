<template>
  <div class="payment">
    <div class="order-items p-2">
      <div class="title w-100 border-bottom-gray-young">
        <h3>Order Item(s)</h3>
      </div>
      <div class="order-items-group">
        <div class="order-item-detail"
          v-for="item in items"
          :key="item.name.toLowerCase().replace(' ','-')"
        >
          <div class="order-item-info">
            <order-items
              :name="item.name"
              :image="item.image"
              :price="item.price"
              :discountPrice="item.discountPrice"
            />
            <b-form-spinbutton id="item" v-model="itemCount" min="1" max="100" />
          </div>
        </div>
      </div>
    </div>

    <div class="payment-details">
      <div class="title w-100 border-bottom-gray-young">
        <h3>Payment Details</h3>
      </div>
      <payment-detail price="" discount="" />
    </div>

    <div class="payment-method">
      <div class="title w-100 border-bottom-gray-young">
        <h3>Payment Method</h3>
      </div>
      <payment-method />
    </div>

    <bottom-nav-payment
      totalItem="1"
      totalPrice="100000"
      innerButton="BUY NOW"
    />
  </div>
</template>

<script>
import OrderItems from '../../../components/User/OrderItems.vue';
import PaymentDetail from '../../../components/User/Payment/PaymentDetail.vue';
import PaymentMethod from '../../../components/User/Payment/PaymentMethod.vue';
import BottomNavPayment from '../../../components/User/Payment/BottomNavPayment.vue';

export default {
  name: 'Payment',
  component: {
    OrderItems,
    PaymentDetail,
    PaymentMethod,
    BottomNavPayment,
  },
};
</script>
