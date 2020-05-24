<template>
  <div class="order-list">
    <card-info :info="cardInfo" />
  </div>
</template>

<script>
import CardInfo from '../../../components/Merchant/Card/CardInfo.vue';

export default {
  name: 'OrderList',
  components: {
    CardInfo,
  },
  computed: {
    cardInfo() {
      return {
        info1: 'Ordered Restaurant Ticket',
        value1: 2,
        info2: 'Ordered Itinerary Ticket',
        value2: 5,
      };
    },
  },
};
</script>
