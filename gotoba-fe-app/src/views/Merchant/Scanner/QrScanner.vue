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
import { toast } from '../../../utils/tool';

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

      const jsonResult = JSON.parse(result);

      if (jsonResult.redeem
      && jsonResult.price
      && jsonResult.expiredDate
      && jsonResult.merchantSku
      && jsonResult.title
      && jsonResult.userSku) {
        this.setTicketBySku(jsonResult);
        this.showScanner = false;
        this.$router.push('/merchant/scan/result');
        return;
      }

      toast('QR Code is not valid!');
    },
  },
};
</script>
