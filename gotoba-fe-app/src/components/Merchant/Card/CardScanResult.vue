<template>
  <div class="card-scan-result bg-white p-3">
    <div class="result-title align-center font-color-blue-primary bold">
      {{ result.title }}
    </div>
    <div class="result-price align-center font-size-32 semibold mt-2">
      {{ price }}
    </div>

    <card-media :data="result" />

    <b-table borderless :items="items"></b-table>
  </div>
</template>

<script>
import { formatPrice, formatDate } from '../../../utils/filter';
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
    price() {
      return formatPrice(this.result.price, false, true);
    },
    items() {
      return [
        [
          'Expired date', formatDate(this.result.expiredDate),
        ],
        [
          'Paid by', this.result.username,
        ],
        [
          'Status', this.result.status,
        ],
      ];
    },
  },
};
</script>
