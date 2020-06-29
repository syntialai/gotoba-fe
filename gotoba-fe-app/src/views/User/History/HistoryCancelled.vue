<template>
  <div class="history-cancelled">
    <card-history-group :histories="cancelledPaymentData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'HistoryCancelled',
  components: {
    CardHistoryGroup,
  },
  computed: {
    ...mapGetters(['cancelledPaymentData', 'userData']),
  },
  created() {
    this.getCancelledPayment(this.userData.sku);
  },
  methods: {
    ...mapActions(['getCancelledPayment']),
  },
};
</script>
