<template>
  <div class="qr-code-info bg-white box-shadow border-square-30 m-4 p-4">
    <div class="d-block align-center">
      <div class="qr-code-title font-color-blue-primary bold">
        {{ title }}
      </div>
      <div class="qr-code-valid-date font-color-black-60">
        {{ validDate }}
      </div>
    </div>

    <div
      v-if="qrCodeValue"
      class="d-flex justify-content-center m-4"
    >
      <vue-qrcode :value="qrCodeValue" :width="200" />
    </div>

    <div class="info align-center">
      Please show this QR Code to Staff to make payment
    </div>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode';
import { formatDate } from '../../../utils/filter';

export default {
  name: 'QRCodeInfo',
  components: {
    VueQrcode,
  },
  props: {
    ticket: Object,
    title: String,
  },
  computed: {
    validDate() {
      return formatDate(new Date(this.ticket.expiredDate));
    },
    qrCodeValue() {
      return JSON.stringify({
        redeem: this.ticket.redeem,
        expiredDate: this.validDate,
        sku: this.ticket.sku,
        merchantSku: this.ticket.merchantSku,
        price: this.ticket.price,
        discount: this.ticket.discount,
      });
    },
  },
};
</script>
