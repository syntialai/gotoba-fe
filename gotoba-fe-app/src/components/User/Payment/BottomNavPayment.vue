<template>
  <div class="bottom-nav-payment">
    <b-navbar class="bottom-nav-payment__navbar bg-white">
      <b-navbar-nav class="d-flex flex-column">
        <span class="semibold font-color-black-87 p-0">
          {{ totalItem }} item
        </span>
        <span class="p-0 font-color-blue-primary">
          {{ price }}
        </span>
      </b-navbar-nav>
      <b-navbar-nav right class="ml-auto">
        <b-button class="btn custom-btn-primary border-none" @click="buttonFunc">
          <div v-if="loading">
            <b-spinner small></b-spinner>
            Processing..
          </div>
          <div v-else>
            {{ innerButton }}
          </div>
        </b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { formatPrice } from '../../../utils/filter';

export default {
  name: 'BottomNavPayment',
  props: {
    totalItem: Number,
    totalPrice: Number,
    innerButton: String,
    buttonFunc: Function,
    loading: Boolean,
  },
  computed: {
    price() {
      return formatPrice(this.totalPrice, true, true);
    },
  },
};
</script>
