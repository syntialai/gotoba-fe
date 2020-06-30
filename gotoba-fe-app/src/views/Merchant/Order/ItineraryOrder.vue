<template>
  <div class="itinerary-order">
    <card-history-group :histories="itineraryOrderData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'ItineraryOrder',
  components: {
    CardHistoryGroup,
  },
  computed: {
    ...mapGetters(['merchantItineraryOrder', 'userInfo']),
  },
  created() {
    this.getMerchantItineraryOrder(this.userInfo.sku);
  },
  methods: {
    ...mapActions(['getMerchantItineraryOrder']),
  },
};
</script>
