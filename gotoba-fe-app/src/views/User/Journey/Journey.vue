<template>
  <div class="journey" v-if="journeyData">
    <div class="journey-profiles bg-white p-3">
      <h6 class="mb-3">Nearby Places</h6>
      <div class="journey-group d-flex flex-wrap">
        <div class="responsive-card"
          v-for="journey in journeyData"
          :key="journey.sku"
        >
          <router-link
            :to="goToDetail('journey', journey.sku)"
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
    </div>

    <div class="journey-ticket bg-white p-3" v-if="ticketJourney">
      <h6>Ticket for Journey</h6>
      <div class="ticket-group">
        <router-link
          v-for="ticket in ticketJourney"
          :key="ticket.sku"
          :to="goToDetail('ticket', ticket.sku)"
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
    goToDetail(category, sku) {
      return `/${category}/${sku}`;
    },
  },
};
</script>
