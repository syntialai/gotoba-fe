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
    init() {
      fullscreen(true);
    },
  },
  methods: {
    onDecode(result) {
      this.qrcodeResult = result;
      fullscreen(false);
      this.showScanner = false;
    },
    fullscreen(enterFullScreen) {
      if (enterFullscreen) {
        requestFullScreen()
      } else {
        exitFullScreen()
      }
    },
  },
  watch: {
    fullscreen(enterFullScreen) {
      this.fullscreen(enterFullScreen);
    },
  },
};
</script>
