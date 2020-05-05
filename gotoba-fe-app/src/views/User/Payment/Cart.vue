<template>
  <div class="cart">
    <div class="order-items p-2">
      <div
        class="w-100 border-bottom-gray-young d-flex justify-content-between"
      >
        <div class="title"><h3>Order Item(s)</h3></div>
        <div class="select-all font-color-black-60">
          <a href="">Select all</a>
        </div>
      </div>
      <div class="order-items-group">
        <div class="order-item-detail"
          v-for="item in items"
          :key="item.name.toLowerCase().replace(' ','-')"
        >
          <b-form-checkbox>
            <div class="order-item-info">
              <order-items
                :name="item.name"
                :image="item.image"
                :price="item.price"
                :discountPrice="item.discountPrice"
              />
              <b-form-spinbutton id="item" v-model="itemCount" min="1" max="100" />
            </div>
          </b-form-checkbox>
        </div>
      </div>
    </div>

    <bottom-nav-payment
      totalItem="1"
      totalPrice="100000"
      innerButton="CHECKOUT"
    />
  </div>
</template>

<script>
import OrderItems from '../../../components/User/OrderItems.vue';
import BottomNavPayment from '../../../components/User/Payment/BottomNavPayment.vue';

export default {
  name: 'Cart',
  component: {
    OrderItems,
    BottomNavPayment,
  },
  data() {
    return {
      itemCount: 1,
    };
  },
};
</script>
