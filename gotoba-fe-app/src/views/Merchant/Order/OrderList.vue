<template>
  <div class="order-list">
    <card-info :info="cardInfo" class="m-4" />

    <b-nav tabs fill class="position-relative">
      <b-nav-item
        to="/merchant/order-list/" exact
        exact-active-class="active"
      >
        <div class="d-flex flex-column">
          <span class="tab-icon icon">
            <font-awesome-icon icon="utensils"></font-awesome-icon>
          </span>
          <span class="tab-title">RESTAURANT</span>
        </div>
      </b-nav-item>
      <b-nav-item
        to="/merchant/order-list/itinerary" exact
        exact-active-class="active"
      >
        <div class="d-flex flex-column">
          <span class="tab-icon icon">
            <font-awesome-icon icon="route"></font-awesome-icon>
          </span>
          <span class="tab-title">ITINERARY</span>
        </div>
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
      'merchantItineraryOrder',
      'merchantRestaurantOrder',
    ]),
    cardInfo() {
      return {
        info1: 'Ordered Restaurant Ticket',
        value1: this.merchantRestaurantOrder.length,
        info2: 'Ordered Itinerary Ticket',
        value2: this.merchantItineraryOrder.length,
      };
    },
  },
  created() {
    this.getMerchantItineraryOrder();
    this.getMerchantRestaurantOrder();
  },
  methods: {
    ...mapActions([
      'getMerchantItineraryOrder',
      'getMerchantRestaurantOrder',
    ]),
  },
};
</script>
