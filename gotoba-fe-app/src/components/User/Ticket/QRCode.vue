<template>
  <div class="qr-code">
    <vue-qrcode :value="qrCodeValue" width="200" />
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode';

export default {
  name: 'QRCode',
  components: {
    VueQrcode,
  },
  props: {
    qrCodeValue: String,
  },
};
</script>
