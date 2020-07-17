<template>
  <div class="restaurant">
    <div class="restaurant-profiles bg-white p-3">
      <h6>Nearby Eats</h6>
      <div class="restaurant-group d-flex flex-wrap">
        <card-home
          v-for="restaurant in restaurantDatas"
          :key="restaurant.sku"
          v-bind="restaurant"
          @click="goToProfile(restaurant.sku)"
        />
      </div>
    </div>

    <div class="restaurant-ticket bg-white p-3 my-3">
      <h6>Ticket for Restaurant</h6>
      <div class="ticket-group">
        <card-home-long
          v-for="ticket in ticketRestaurant"
          :key="ticket.sku"
          :data="ticket"
          @click="goToDetails(ticket.sku)"
        />
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
      this.$router.push(`/restaurant/${restaurantSku}`);
    },
    goToDetails(ticketSku) {
      this.$router.push(`/ticket/${ticketSku}`);
    },
  },
};
</script>
