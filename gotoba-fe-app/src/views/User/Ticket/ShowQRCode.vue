<template>
  <div
    id="show-qr-code"
    class="bg-color-primary d-flex flex-column justify-content-around align-content-center"
  >
    <div class="title text-white bold font-size-32">QR Code</div>

    <q-r-code-info v-bind="ticketInfo" />

    <div class="close">
      <b-button
        variant="link"
        class="text-white font-size-32"
        href="/tickets"
      >
        <p><b-icon icon="x"></b-icon></p>
      </b-button>
    </div>
  </div>
</template>

<script>
import QRCodeInfo from '../../../components/User/Ticket/QRCodeInfo.vue';

export default {
  name: 'ShowQRCode',
  components: {
    QRCodeInfo,
  },
  computed: {
    ticketInfo: {},
  },
};
</script>
