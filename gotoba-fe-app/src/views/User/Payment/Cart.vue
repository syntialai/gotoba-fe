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
          <b-form-checkbox-group
            v-model="selected"
            @input="setOrderData(selected)"
          >
            <b-form-checkbox
              v-for="item in cartData"
              :key="item.name"
              class="w-100"
              :value="item"
            >
              <cart-item
                :ticket="item"
                :quantity.sync="item.quantity"
              />
            </b-form-checkbox>
          </b-form-checkbox-group>
        </div>

        <div class="mt-80 fixed-bottom">
          <bottom-nav-payment
            :totalItem="orderTotal.item"
            :totalPrice="orderTotal.price - orderTotal.discount"
            innerButton="CHECKOUT"
            :buttonFunc="checkout"
            :loading="loading"
          />
        </div>
      </div>
    </div>
    <div class="cart_empty" v-else>
      <div class="d-block align-center pt-5 mb-3">
        <img
          src="@/assets/img/illustrate/empty-cart.png"
          alt="No data"
          width="40%"
          class="mt-3"
        >
      </div>
      <div class="info align-center">
        <div class="text align-center p-3">
          Oops! Your cart is empty. Start adding ticket to your cart.
        </div>
        <b-button
          class="custom-btn-primary border-none text-white"
          to="/more"
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
    ...mapGetters(['cartData', 'orderTotal', 'userSku']),
  },
  created() {
    this.getCartData(this.userSku);
  },
  data() {
    return {
      select: true,
      selected: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions(['setOrderData', 'selectAllCartData', 'getCartData', 'setCartData']),
    checkAll() {
      this.select = !this.select;
      if (this.select) {
        this.selected = this.cartData;
        this.total();
        return;
      }
      this.selected = [];
      this.total();
    },
    total() {
      this.setOrderData(this.selected);
    },
    checkout() {
      this.loading = true;
      this.total();
      this.$router.push('/payment');
    },
  },
  watch: {
    cartData() {
      this.selected = [...this.cartData];
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-control-label {
  width: 100%!important;
}

.mt-80 {
   margin-bottom: 80px!important;
 }
 </style>
