<template>
  <div class="scan-result">
    <card-scan-result class="mt-3" :result="ticketData" />

    <b-button
      block
      :disabled="ticketData.status !== 'Available'"
      class="m-3"
    >
      USE TICKET
    </b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardScanResult from '../../../components/Merchant/Card/CardScanResult.vue';

export default {
  name: 'ScanResult',
  components: {
    CardScanResult,
  },
  computed: {
    ...mapGetters(['ticketData']),
  },
  methods: {
    ...mapActions([]),
  },
};
</script>
