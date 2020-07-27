<template>
  <div class="scan-result">
    <div v-if="isMerchant">
      <card-scan-result
        class="mt-3"
        :result="ticketData"
      />

      <b-button
        block
        :disabled="!ticketData.redeem"
        @click="useTicket"
        class="m-3"
      >
        USE TICKET
      </b-button>
    </div>
    <div v-else class="align-center p-3">
      <img
        class="ticket-size mt-5 mb-3"
        src="@/assets/img/illustrate/no-access.png"
        width="100%"
      >
      <div class="font-size-32 font-color-blue-primary">
        Oops!
      </div>
      <div class="mt-1">
        This is not your ticket.. Try scan another promotion QR code.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { alert } from '../../../utils/tool';
import api from '../../../api/api';
import CardScanResult from '../../../components/Merchant/Card/CardScanResult.vue';

export default {
  name: 'ScanResult',
  components: {
    CardScanResult,
  },
  computed: {
    ...mapGetters([
      'ticketData',
      'userSku',
    ]),
    isMerchant() {
      return this.ticketData.merchantSku === this.userSku;
    },
  },
  created() {
    if (this.isMerchant) {
      if (this.ticketData.wisataSku) {
        this.getJourneyDataBySku(this.ticketData.wisataSku);
      } else {
        this.getRestaurantDataByMerchantSku(this.ticketData.merchantSku);
      }
    }
  },
  methods: {
    ...mapActions([
      'getJourneyDataBySku',
      'getRestaurantDataByMerchantSku',
      'setTicketBySku',
    ]),
    async useTicket() {
      const data = { ...this.ticketData };
      data.redeem = false;

      try {
        await api.EditOrderDetail(this.ticketData.sku, data);
        this.setTicketBySku(data);
        alert('used ticket!', true);
      } catch (err) {
        alert('use ticket. Please try again!', true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 500px) {
  .ticket-size {
    width: 75%;
  }
}
</style>
