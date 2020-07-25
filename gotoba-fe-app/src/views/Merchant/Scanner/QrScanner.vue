<template>
  <div class="qr-scanner">
    <qrcode-stream
      v-show="showScanner"
      @decode="onDecode"
    ></qrcode-stream>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'QrScanner',
  components: {
    QrcodeStream,
  },
  data() {
    return {
      showScanner: true,
      qrcodeResult: '',
    };
  },
  methods: {
    ...mapActions(['setTicketBySku']),
    onDecode(result) {
      this.qrcodeResult = result;
      this.showScanner = false;

      // if (typeof result === 'object') {
      this.setTicketBySku(result);
      this.$router.push('/merchant/scan/result');
      // }
    },
  },
};
</script>
