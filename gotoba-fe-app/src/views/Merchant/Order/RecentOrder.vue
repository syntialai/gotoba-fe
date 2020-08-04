<template>
  <div class="itinerary-order">
    <div class="card-payment-group p-3 margin-80">
      <card-payment
        v-for="items in merchantResponsedData"
        :key="items.sku"
        :item="items"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardPayment from '../../../components/Merchant/Card/CardPayment.vue';

export default {
  name: 'RecentOrder',
  components: {
    CardPayment,
  },
  computed: {
    ...mapGetters(['merchantResponsedData']),
  },
};
</script>
