<template>
  <b-navbar class="bottom-nav-payment">
    <b-navbar-nav class="d-flex flex-column">
      <b-navbar-item class="semibold font-color-black-87">
        {{ totalItem }} item
      </b-navbar-item>
      <b-navbar-item class="">
        {{ formatPrice(totalPrice, true, true) }}
      </b-navbar-item>
    </b-navbar-nav>
    <b-navbar-nav right class="ml-auto">
      <b-button class="btn custom-btn-primary border-square-5">
        {{ innerButton }}
      </b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import formatPrice from '@/utils/filter';

export default {
  name: 'BottomNavPayment',
  props: {
    totalItem: String,
    totalPrice: String,
    innerButton: String,
  },
  method: {
    formatPrice,
  },
};
</script>
