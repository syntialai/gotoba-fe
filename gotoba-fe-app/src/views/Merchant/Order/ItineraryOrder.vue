<template>
  <div class="itinerary-order">
    <card-history-group :histories="merchantItineraryOrder" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'ItineraryOrder',
  components: {
    CardHistoryGroup,
  },
  computed: {
    ...mapGetters(['merchantItineraryOrder']),
  },
};
</script>
