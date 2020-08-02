<template>
  <div class="ticket-detail">
    <div class="ticket-card">
      <card-info-detail :info="ticketData" v-if="ticketData" />

      <div class="w-100 d-flex box-shadow fixed-bottom bg-white">
        <div class="w-50 p-2">
          <b-button
            block
            class="bg-white font-color-blue-primary p-3 border-square-10 box-shadow"
            @click="addToCart"
          >ADD TO CART</b-button>
        </div>
        <div class="w-50 p-2">
          <b-button
            block
            class="custom-btn-primary p-3 border-square-10"
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
import api from '../../../api/api';
import CardInfoDetail from '../../../components/User/CardInfoDetail.vue';

export default {
  name: 'TicketDetail',
  components: {
    CardInfoDetail,
  },
  computed: {
    ...mapGetters(['ticketData', 'userSku']),
  },
  created() {
    this.getTicketBySku(this.$route.params.sku);
  },
  data() {
    return {
      orderSku: '',
      quantity: 1,
    };
  },
  methods: {
    ...mapActions([
      'getTicketBySku',
      'setCartData',
      'setOrderData',
    ]),

    setData() {
      const data = {
        quantity: this.quantity,
        redeem: 0,
        expiredDate: this.ticketData.expiredDate,
        title: this.ticketData.title,
        image: this.ticketData.image,
        price: this.ticketData.price,
        discount: this.ticketData.discount,
        ticketSku: this.ticketData.sku,
        merchantSku: this.ticketData.merchantSku,
        category: this.ticketData.category,
        wisataSku: this.ticketData.wisataSku,
        userSku: this.userSku,
      };
      return data;
    },

    async addToCart() {
      const data = this.setData();

      try {
        let res;
        if (this.orderSku === '') {
          res = await api.PostOrderDetail(this.userSku, data);
        } else {
          res = await api.EditOrderDetail(this.orderSku, data);
        }
        this.orderSku = res.data.sku;
        toast('Ticket has been added to cart!');
      } catch (err) {
        toast('Error while adding ticket');
      }
    },

    async payNow() {
      await this.addToCart();

      this.$router.push('/cart');
    },
  },
};
</script>
