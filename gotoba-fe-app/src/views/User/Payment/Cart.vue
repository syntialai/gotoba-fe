<template>
  <div class="cart min-vh-100 position-relative bg-color-main">
    <div class="cart_filled" v-if="cartData && cartData.length > 0">
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
        <div class="order-items-group w-100 py-3">
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

        <bottom-nav-payment
          :totalItem="orderTotal.item"
          :totalPrice="orderTotal.price - orderTotal.discount"
          innerButton="CHECKOUT"
          :buttonFunc="checkout"
        />
      </div>
    </div>
    <div class="cart_empty" v-else>
      <div class="d-block align-center pt-5 mb-3">
        <img
          src="@/assets/img/illustrate/empty-cart.png"
          alt="No data"
          width="50%"
        >
      </div>
      <div class="info align-center">
        <div class="text align-center p-3">
          Oops! Your cart is empty. Start adding ticket to your cart.
        </div>
        <b-button
          class="custom-btn-primary border-none"
          @click="goToTicketPage"
        >ADD SOME TICKET</b-button>
      </div>
    </div>
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
  created() {
    if (this.cartData.length === 0) {
      this.getCartData();
    }
  },
  data() {
    return {
      select: false,
    };
  },
  methods: {
    ...mapActions(['setOrderData', 'selectAllCartData', 'getCartData']),
    checkAll() {
      this.select = !this.select;
      this.selectAllCartData(this.select);
    },
    goToTicketPage() {
      this.$router.push('/more');
    },
    checkout() {
      this.setOrderData(this.cartData.filter((item) => item.selected));
      this.$router.push('/payment');
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-control-label {
  width: 100%!important;
}
</style>
