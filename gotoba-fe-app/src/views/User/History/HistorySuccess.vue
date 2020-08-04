<template>
  <div class="history-success">
    <card-history-group
      v-if="acceptedPaymentData"
      :histories="acceptedPaymentData"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'HistorySuccess',
  components: {
    CardHistoryGroup,
  },
  computed: {
    ...mapGetters(['acceptedPaymentData', 'userSku']),
  },
  created() {
    this.getAcceptedPayment(this.userSku);
  },
  methods: {
    ...mapActions(['getAcceptedPayment']),
  },
};
</script>
