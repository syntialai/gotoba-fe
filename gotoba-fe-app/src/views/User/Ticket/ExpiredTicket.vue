<template>
  <div class="expired-ticket pt-2 pb-2">
    <card-ticket
      v-for="ticket in expiredTickets"
      :key="ticket.title"
      :ticket="ticket"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardTicket from '../../../components/User/Ticket/CardTicket.vue';

export default {
  name: 'ExpiredTicket',
  components: {
    CardTicket,
  },
  computed: {
    ...mapGetters(['ticketDatas']),
    expiredTickets(sku) {
      return this.ticketDatas(sku);
    },
  },
};
</script>
