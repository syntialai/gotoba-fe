<template>
  <div class="restaurant-order">
    <card-history-group :histories="restaurantOrderData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'RestaurantOrder',
  components: {
    CardHistoryGroup,
  },
  computed: {
    ...mapGetters(['merchantRestaurantOrder', 'userInfo']),
  },
  created() {
    this.getMerchantRestaurantOrder(this.userInfo.sku);
  },
  methods: {
    ...mapActions(['getMerchantRestaurantOrder']),
  },
};
</script>
