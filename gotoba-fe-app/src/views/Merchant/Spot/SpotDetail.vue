<template>
  <div class="spot-detail">
    <profile-detail
      v-if="journeyDataBySku"
      :data="journeyDataBySku"
      :promotions="ticketItineraryByMerchant"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';

export default {
  name: 'SpotDetail',
  components: {
    ProfileDetail,
  },
  computed: {
    ...mapGetters([
      'journeyDataBySku',
      'userSku',
      'ticketItineraryByMerchant',
    ]),
  },
  created() {
    this.getJourneyDataBySku(this.$route.params.sku);
    this.getTicketByMerchant(this.userSku);
  },
  methods: {
    ...mapActions([
      'getJourneyDataBySku',
      'getTicketByMerchant',
    ]),
  },
};
</script>
