<template>
  <div
    id="show-qr-code"
    class="bg-color-primary d-flex flex-column justify-content-around
    align-content-center py-4 min-vh-100"
  >
    <div class="title text-white bold font-size-32 d-block align-center">
      QR Code
    </div>

    <q-r-code-info
      v-if="orderDataBySku"
      :ticket="orderDataBySku"
    />

    <div class="close">
      <b-button
        block
        variant="link"
        class="text-white font-size-32"
        to="/my-tickets"
      >
        <p><b-icon icon="x"></b-icon></p>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import QRCodeInfo from '../../../components/User/Ticket/QRCodeInfo.vue';

export default {
  name: 'ShowQRCode',
  components: {
    QRCodeInfo,
  },
  computed: {
    ...mapGetters(['orderDataBySku']),
  },
  created() {
    this.getOrderDataBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getOrderDataBySku']),
  },
};
</script>
