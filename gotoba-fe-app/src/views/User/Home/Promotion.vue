<template>
  <div class="promotion">
    <div class="promotion-profiles bg-white p-3 my-3">
      <h6>Recent Promotion</h6>
      <div class="promotion-group">
        <card-home-long
          v-for="ticket in promotions"
          :key="ticket.sku"
          :data="ticket"
          @click="goToProfile(ticket.sku)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isPassed } from '../../../utils/filter';
import CardHomeLong from '../../../components/User/Home/CardHomeLong.vue';

export default {
  name: 'Promotion',
  components: {
    CardHomeLong,
  },
  computed: {
    ...mapGetters(['ticketDatas']),
    promotions() {
      const promotion = [...this.ticketDatas];

      return promotion
        .filter((ticket) => !isPassed(ticket.expiredDate))
        .sort((a, b) => b.expiredDate - a.expiredDate);
    },
  },
  methods: {
    goToProfile(ticketSku) {
      this.$router.push(`/promotion/${ticketSku}`);
    },
  },
};
</script>
