<template>
  <div class="scan-result">
    <div v-if="orderDataBySku && isMerchant">
      <card-scan-result
        class="mt-3"
        v-if="orderDataBySku"
        :result="orderDataBySku"
      />

      <b-button
        block
        :disabled="!orderDataBySku.redeem"
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
import { isPassed } from '../../../utils/filter';
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
      'orderDataBySku',
    ]),
    isMerchant() {
      return this.orderDataBySku.merchantSku === this.userSku;
    },
    canUse() {
      return this.orderDataBySku.redeem && !isPassed(new Date(this.result.expiredDate));
    },
  },
  created() {
    this.getOrderDataBySku(this.ticketData.sku);
  },
  methods: {
    ...mapActions([
      'getJourneyDataBySku',
      'getRestaurantDataByMerchantSku',
      'setTicketBySku',
      'getOrderDataBySku',
      'setOrderDataBySku',
    ]),
    async useTicket() {
      const data = { ...this.orderDataBySku };
      data.redeem = false;

      try {
        const res = await api.RedeemOrder(this.orderDataBySku.sku);
        this.setOrderDataBySku(data);
        console.log(res, data);
        alert('used ticket', true);
      } catch (err) {
        alert('use ticket. Please try again later', false);
      }
    },
  },
  watch: {
    orderDataBySku() {
      if (this.orderDataBySku) {
        this.getJourneyDataBySku(this.orderDataBySku.wisataSku);
      } else {
        this.getRestaurantDataByMerchantSku(this.orderDataBySku.merchantSku);
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
