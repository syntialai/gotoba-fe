<template>
  <div class="qr-code-info bg-white box-shadow border-square-30 m-4 p-4">
    <div class="d-block align-center">
      <div class="qr-code-title font-color-blue-primary bold">
        {{ title }}
      </div>
      <div class="qr-code-valid-date font-color-black-60">
        {{ formatDate(date) }}
      </div>
    </div>

    <q-r-code
      :qrCodeValue="qrCodeValue"
      class="d-flex justify-content-center m-4"
    />

    <div class="info align-center">
      Please show this QR Code to Staff to make payment
    </div>
  </div>
</template>

<script>
import QRCode from './QRCode.vue';
import { formatDate } from '../../../utils/filter';

export default {
  name: 'QRCodeInfo',
  components: {
    QRCode,
  },
  props: {
    title: String,
    date: Date,
    qrCodeValue: String,
  },
  methods: {
    formatDate,
  },
};
</script>
