<template>
  <div class="order-list">
    <card-info :info="cardInfo" class="m-4" />

    <b-nav tabs fill class="position-relative">
      <b-nav-item
        to="/merchant/order-list/" exact
        exact-active-class="active"
      >
        <span class="tab-title">NEW ORDER</span>
      </b-nav-item>
      <b-nav-item
        to="/merchant/order-list/recent" exact
        exact-active-class="active"
      >
        <span class="tab-title">RECENT</span>
      </b-nav-item>
    </b-nav>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardInfo from '../../../components/Merchant/Card/CardInfo.vue';

export default {
  name: 'OrderList',
  components: {
    CardInfo,
  },
  computed: {
    ...mapGetters([
      'merchantOrderCount',
    ]),
    cardInfo() {
      return {
        info1: 'Ordered Restaurant Ticket',
        value1: this.merchantOrderCount.restaurant,
        info2: 'Ordered Itinerary Ticket',
        value2: this.merchantOrderCount.itinerary,
      };
    },
  },
  created() {
    this.getMerchantOrderData();
    this.getMerchantOrderCount();
  },
  methods: {
    ...mapActions([
      'getMerchantOrderCount',
      'getMerchantOrderData',
    ]),
  },
};
</script>
