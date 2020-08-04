<template>
  <div class="history-cancelled">
    <card-history-group
      v-if="cancelledPaymentData"
      :histories="cancelledPaymentData"
    />
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
    ...mapGetters(['cancelledPaymentData', 'userSku']),
  },
  created() {
    this.getCancelledPayment(this.userSku);
  },
  methods: {
    ...mapActions(['getCancelledPayment']),
  },
};
</script>
