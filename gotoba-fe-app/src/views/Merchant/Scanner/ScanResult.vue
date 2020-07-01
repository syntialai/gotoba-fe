<template>
  <div
    id="scan-result"
    class="bg-color-primary d-flex flex-column justify-content-around
    align-content-center py-4 min-vh-100"
  >
    <div class="title text-white bold font-size-32 d-block align-center">
      QR Code Result
    </div>

    <div class="close">
      <b-button
        block
        variant="link"
        class="text-white font-size-32"
        href="/my-tickets"
      >
        <p><b-icon icon="x"></b-icon></p>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ScanResult',
  computed: {
    ...mapGetters(['ticketData']),
  },
};
</script>
