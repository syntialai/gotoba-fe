<template>
  <div class="payment">
    <NavigationBack title="Payment" />

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
            <OrderItems
              :name="item.name"
              :image="item.image"
              :price="item.price"
              :discountPrice="item.discountPrice"
            />
            <b-button-group size="sm">
              <b-button @click="subItem">-</b-button>
              <b-button :class="['item-'+item.name+'-count']">1</b-button>
              <b-button @click="addItem">+</b-button>
            </b-button-group>
          </div>
        </div>
      </div>
    </div>

    <div class="payment-details">
      <div class="title w-100 border-bottom-gray-young">
        <h3>Payment Details</h3>
      </div>
      <PaymentDetail price="" discount="" />
    </div>

    <div class="payment-method">
      <div class="title w-100 border-bottom-gray-young">
        <h3>Payment Method</h3>
      </div>
      <PaymentMethod />
    </div>

    <BottomNavPayment
      totalItem="1"
      totalPrice="100000"
      innerButton="BUY NOW"
    />
  </div>
</template>

<script>
import NavigationBack from '@/components/Partial/NavigationBack.vue';
import OrderItems from '@/components/User/OrderItems.vue';
import PaymentDetail from '@/components/User/Payment/PaymentDetail.vue';
import PaymentMethod from '@/components/User/Payment/PaymentMethod.vue';
import BottomNavPayment from '@/components/User/Payment/BottomNavPayment.vue';

export default {
  name: 'Payment',
  component: {
    NavigationBack,
    OrderItems,
    PaymentDetail,
    PaymentMethod,
    BottomNavPayment,
  },
};
</script>
