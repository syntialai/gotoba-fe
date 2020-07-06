<template>
  <div class="journey">
    <div class="journey-profiles bg-white p-3">
      <h6>Nearby Places</h6>
      <div class="journey-group d-flex flex-wrap">
        <card-home
          v-for="journey in journeyData"
          :key="journey.sku"
          v-bind="journey"
          @click="goToProfile(journey.sku)"
        />
      </div>
    </div>

    <div class="journey-ticket bg-white p-3 my-3">
      <h6>Ticket for Journey</h6>
      <div class="ticket-group">
        <card-home-long
          v-for="ticket in ticketJourney"
          :key="ticket.sku"
          :data="ticket"
          @click="goToDetails(ticket.sku)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardHome from '../../../components/User/Home/CardHome.vue';
import CardHomeLong from '../../../components/User/Home/CardHomeLong.vue';

export default {
  name: 'Journey',
  components: {
    CardHome,
    CardHomeLong,
  },
  computed: {
    ...mapGetters(['journeyData', 'ticketJourney']),
  },
  methods: {
    goToProfile(journeySku) {
      this.$router.push(`/journey/${journeySku}`);
    },
    goToDetails(ticketSku) {
      this.$router.push(`/promotion/${ticketSku}`);
    },
  },
};
</script>
