<template>
  <div class="ticket-detail">
    <div class="ticket-card">
      <card-info-detail v-bind="ticketData" v-if="ticketData" />

      <div class="w-100 d-flex box-shadow fixed-bottom">
        <div class="w-50">
          <b-button
            block
            squared
            class="bg-white font-color-blue-primary p-3"
            @click="addToCart"
          >ADD TO CART</b-button>
        </div>
        <div class="w-50">
          <b-button
            block
            squared
            class="custom-btn-primary p-3"
            @click="payNow"
          >PAY NOW</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from '../../../utils/tool';
import CardInfoDetail from '../../../components/User/CardInfoDetail.vue';

export default {
  name: 'TicketDetail',
  components: {
    CardInfoDetail,
  },
  computed: {
    ...mapGetters(['ticketData']),
  },
  created() {
    this.getTicketBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getTicketBySku', 'setCartDataQuantity', 'setOrderData']),

    setData() {
      const data = { ...this.ticketData };
      delete Object.assign(data, { ticketSku: data.sku }).sku;
      Object.assign(data, { quantity: 1 });
      return data;
    },

    addToCart() {
      const data = this.setData();

      this.setCartDataQuantity(data);
      toast('Ticket has been added to cart!');
    },

    payNow() {
      const data = this.setData();

      this.setOrderData(data);
      this.$router.push('/payment');
    },
  },
};
</script>
