<template>
  <div class="card-scan-result bg-white p-3">
    <div class="result-title align-center font-color-blue-primary bold">
      {{ result.title }}
    </div>
    <div class="result-price align-center font-size-32 semibold my-2">
      {{ price }}
    </div>

    <card-media
      v-if="journeyDataBySku || restaurantData"
      :data="mediaData"
    />

    <b-table stacked :items="items"></b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatPrice, formatDate, isPassed } from '../../../utils/filter';
import CardMedia from './CardMedia.vue';

export default {
  name: 'CardScanResult',
  components: {
    CardMedia,
  },
  props: {
    result: Object,
  },
  computed: {
    ...mapGetters([
      'journeyDataBySku',
      'restaurantData',
    ]),
    price() {
      return formatPrice(this.result.price - this.result.discount, false, true);
    },
    status() {
      if (isPassed(new Date(this.result.expiredDate))) {
        return 'Expired';
      }
      if (!this.result.redeem) {
        return 'Available';
      }

      return 'Used';
    },
    items() {
      return [
        {
          expired_date: formatDate(new Date(this.result.expiredDate)),
          quantity: this.result.quantity,
          status: this.status,
        },
      ];
    },
    mediaData() {
      if (this.result.wisataSku) {
        return this.journeyDataBySku;
      }
      return this.restaurantData;
    },
  },
};
</script>
