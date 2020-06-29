<template>
  <div class="history-pending">
    <card-history-group :histories="waitingPaymentData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'HistoryPending',
  components: {
    CardHistoryGroup,
  },
  computed: {
    ...mapGetters(['waitingPaymentData', 'userData']),
  },
  created() {
    this.getWaitingPayment(this.userData.sku);
  },
  methods: {
    ...mapActions(['getWaitingPayment']),
  },
};
</script>
