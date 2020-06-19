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
    fullscreen(enterFullScreen) {
      if (enterFullScreen) {
        requestFullScreen();
      } else {
        exitFullScreen();
      }
    },
    init() {
      this.fullscreen(true);
    },
    onDecode(result) {
      this.qrcodeResult = result;
      this.fullscreen(false);
      this.showScanner = false;
    },
  },
  watch: {
    fullscreen(enterFullScreen) {
      this.fullscreen(enterFullScreen);
    },
  },
};
</script>
