<template>
  <div class="history-success">
    <card-history-group :histories="acceptedPaymentData" />
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
    ...mapGetters(['acceptedPaymentData', 'userData']),
  },
  created() {
    this.getAcceptedPayment(this.userData.sku);
  },
  methods: {
    ...mapActions(['getAcceptedPayment']),
  },
};
</script>
