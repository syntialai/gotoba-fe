<template>
  <div class="restaurant">
    <div class="restaurant-profiles bg-white p-3" v-if="restaurantDatas">
      <h6 class="mb-3">Nearby Eats</h6>
      <div class="restaurant-group d-flex flex-wrap">
        <div class="responsive-card"
          v-for="restaurant in restaurantDatas"
          :key="restaurant.sku"
        >
          <router-link :to="goToProfile(restaurant.sku)">
            <card-home v-bind="restaurant" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="restaurant-ticket bg-white p-3" v-if="ticketRestaurant">
      <h6>Ticket for Restaurant</h6>
      <div class="ticket-group">
        <router-link
          v-for="ticket in ticketRestaurant"
          :key="ticket.sku"
          :to="goToDetails(ticket.sku)"
        >
          <card-home-long :data="ticket" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CardHome from '../../../components/User/Home/CardHome.vue';
import CardHomeLong from '../../../components/User/Home/CardHomeLong.vue';

export default {
  name: 'Restaurant',
  components: {
    CardHome,
    CardHomeLong,
  },
  computed: {
    ...mapGetters(['restaurantDatas', 'ticketRestaurant']),
  },
  created() {
    this.getRestaurantData();
    this.getTicketRestaurant();
  },
  methods: {
    ...mapActions(['getRestaurantData', 'getTicketRestaurant']),
    goToProfile(restaurantSku) {
      return `/restaurant/${restaurantSku}`;
    },
    goToDetails(ticketSku) {
      return `/ticket/${ticketSku}`;
    },
  },
};
</script>
