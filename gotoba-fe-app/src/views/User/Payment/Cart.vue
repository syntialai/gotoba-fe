<template>
  <div class="cart min-vh-100 position-relative bg-color-main">
    <div class="order-items px-3 bg-white">
      <div
        class="border-bottom-gray-young d-flex justify-content-between align-items-center py-2"
      >
        <div class="title font-size-20 bold">Order Item(s)</div>
        <div class="select-all font-color-black-60">
          <b-button
            variant="link"
            class="font-color-blue-primary py-0"
            @click="checkAll"
          >
            Select all
          </b-button>
        </div>
      </div>
      <div class="order-items-group w-100 py-3" v-if="cartData">
        <div class="order-item-detail"
          v-for="item in cartData"
          :key="item.name"
        >
          <b-form-checkbox
            class="w-100"
            v-model="item.selected"
          >
            <cart-item
              :name="item.name"
              :image="item.image"
              :price="item.price"
              :discountPrice="item.discountPrice"
              :quantity.sync="item.quantity"
            />
          </b-form-checkbox>
        </div>
      </div>
    </div>

    <bottom-nav-payment
      :totalItem="orderTotal.item"
      :totalPrice="orderTotal.price - orderTotal.discount"
      innerButton="CHECKOUT"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CartItem from '../../../components/User/Payment/CartItem.vue';
import BottomNavPayment from '../../../components/User/Payment/BottomNavPayment.vue';

export default {
  name: 'Cart',
  components: {
    CartItem,
    BottomNavPayment,
  },
  computed: {
    ...mapGetters(['cartData', 'orderTotal']),
  },
  data() {
    return {
      select: false,
    };
  },
  methods: {
    ...mapActions(['setOrderData', 'selectAllCartData']),
    checkAll() {
      this.select = !this.select;
      this.selectAllCartData(this.select);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-control-label {
  width: 100%!important;
}
</style>
