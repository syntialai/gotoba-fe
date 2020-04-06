<template>
  <b-navbar class="bottom-nav-payment">
    <b-navbar-nav class="d-flex flex-column">
      <b-navbar-item class="semibold font-color-black-87">
        {{ totalItem }} item
      </b-navbar-item>
      <b-navbar-item class="">
        {{ format(totalPrice) }}
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
export default {
  name: 'BottomNavPayment',
  props: {
    totalItem: String,
    totalPrice: String,
    innerButton: String,
  },
  method: {
    format(price) {
      return `Rp${new Intl.NumberFormat('id').format(parseInt(price))}.00`;
    },
  },
};
</script>
