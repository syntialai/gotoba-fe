<template>
  <div class="promotion">
    <div class="promotion-profiles bg-white p-3 my-3">
      <h6>Recent Promotion</h6>
      <div class="promotion-group">
        <card-home-long
          v-for="ticket in ticketPromotion"
          :key="ticket.sku"
          :data="ticket"
          @click="goToProfile(ticket.sku)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CardHomeLong from '../../../components/User/Home/CardHomeLong.vue';

export default {
  name: 'Promotion',
  components: {
    CardHomeLong,
  },
  computed: {
    ...mapGetters(['ticketPromotion']),
  },
  created() {
    this.getTicketPromotion();
  },
  methods: {
    ...mapActions(['getTicketPromotion']),
    goToProfile(ticketSku) {
      this.$router.push(`/ticket/${ticketSku}`);
    },
  },
};
</script>
