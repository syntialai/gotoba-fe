<template>
  <div class="itinerary-order">
    <card-history-group :histories="itineraryOrderData" />
  </div>
</template>

<script>
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'ItineraryOrder',
  components: {
    CardHistoryGroup,
  },
};
</script>
