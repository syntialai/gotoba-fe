<template>
  <div class="qr-scanner vh-100 w-100">
    <qrcode-stream
      class="h-100 w-100"
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

      if (result) {
        this.setTicketBySku({
          sku: result,
        });
        this.showScanner = false;
        this.$router.push('/merchant/scan/result');
      }
    },
  },
};
</script>
