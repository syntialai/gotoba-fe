<template>
  <div class="bottom-nav-payment">
    <b-navbar class="bg-white fixed-bottom pb-5 mb-5">
      <b-navbar-nav class="d-flex flex-column p-0">
        <b-nav-item class="semibold font-color-black-87 p-0">
          {{ totalItem }} item
        </b-nav-item>
        <b-nav-item class="p-0 font-color-blue-primary">
          {{ formatPrice(totalPrice, true, true) }}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav right class="ml-auto">
        <b-button class="btn custom-btn-primary border-none">
          {{ innerButton }}
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
  },
  methods: {
    formatPrice,
  },
};
</script>
