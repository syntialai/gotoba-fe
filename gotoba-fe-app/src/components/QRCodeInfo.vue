<template>
  <div class="qr-code-info bg-white box-shadow border-square-30 m-4">
    <div class="qr-code-title font-color-blue-primary">
      {{ title }}
    </div>
    <div class="qr-code-valid-date">
      {{ formatDate(date) }}
    </div>
    
    <QRCode
      :qrCodeValue="qrCodeValue"
      class="d-flex justify-content-center m-4"
    />

    <div class="info align-center">
      Please show this QR Code to Staff to make payment
    </div>
  </div>
</template>

<script>
import QRCode from '@/components/QRCode.vue';
import formatDate from '@/utils/filter';

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
  method: {
    formatDate,
  },
};
</script>