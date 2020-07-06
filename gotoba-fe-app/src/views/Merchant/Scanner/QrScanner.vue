<template>
  <div class="qr-scanner">
    <qrcode-stream
      v-show="showScanner"
      @decode="onDecode"
      @init="init"
    ></qrcode-stream>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { QrcodeStream } from 'vue-qrcode-reader';
import { requestFullScreen, exitFullScreen } from '../../../utils/tool';

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
  computed: {

  },
  methods: {
    ...mapActions(['setTicketBySku']),
    fullscreen(enterFullScreen) {
      if (enterFullScreen) {
        requestFullScreen();
      } else {
        exitFullScreen();
      }
    },
    init() {
      // this.fullscreen(true);
    },
    onDecode(result) {
      this.qrcodeResult = result;
      // this.fullscreen(false);
      this.showScanner = false;

      // if (typeof result === 'object') {
      this.setTicketBySku(result);
      this.$router.push('/merchant/scan/result');
      // }
    },
  },
  watch: {
    fullscreen(enterFullScreen) {
      this.fullscreen(enterFullScreen);
    },
  },
};
</script>
