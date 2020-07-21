<template>
  <div class="journey" v-if="journeyData">
    <div class="journey-profiles bg-white p-3">
      <h6>Nearby Places</h6>
      <div class="journey-group d-flex flex-wrap">
        <router-link
          v-for="journey in journeyData"
          :key="journey.sku"
          :to="'/journey/' + journey.sku"
        >
          <card-home
            :name="journey.name"
            :rating="journey.rating"
            :image="journey.image"
            :location="journey.address"
          />
        </router-link>
      </div>
    </div>

    <div class="journey-ticket bg-white p-3 my-3" v-if="ticketJourney">
      <h6>Ticket for Journey</h6>
      <div class="ticket-group">
        <router-link
          v-for="ticket in ticketJourney"
          :key="ticket.sku"
          :to="'/ticket/' + ticket.sku"
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
  name: 'Journey',
  components: {
    CardHome,
    CardHomeLong,
  },
  computed: {
    ...mapGetters(['journeyData', 'ticketJourney']),
  },
  created() {
    this.getJourneyData();
    this.getTicketJourney();
  },
  methods: {
    ...mapActions(['getJourneyData', 'getTicketJourney']),
  },
};
</script>
