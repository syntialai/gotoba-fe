<template>
  <div class="restaurant-order">
    <div class="card-payment-group p-3 margin-80">
      <card-payment
        v-for="items in merchantWaitingResponseData"
        :key="items.sku"
        :item="items"
        :pay="true"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardPayment from '../../../components/Merchant/Card/CardPayment.vue';

export default {
  name: 'RestaurantOrder',
  components: {
    CardPayment,
  },
  computed: {
    ...mapGetters(['merchantWaitingResponseData']),
  },
};
</script>
