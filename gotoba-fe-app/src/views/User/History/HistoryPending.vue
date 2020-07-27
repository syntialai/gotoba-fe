<template>
  <div class="history-pending">
    <card-history-group
      v-if="waitingPaymentData"
      :histories="waitingPaymentData"
    />
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
    ...mapGetters(['waitingPaymentData', 'userSku']),
  },
  created() {
    this.getWaitingPayment(this.userSku);
  },
  methods: {
    ...mapActions(['getWaitingPayment']),
  },
};
</script>
