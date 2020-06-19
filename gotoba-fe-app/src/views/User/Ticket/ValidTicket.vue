<template>
  <div class="valid-ticket pt-2 pb-2">
    <card-ticket
      v-for="ticket in validTickets"
      :key="ticket.title"
      :ticket="ticket"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardTicket from '../../../components/User/Ticket/CardTicket.vue';

export default {
  name: 'ValidTicket',
  components: {
    CardTicket,
  },
  computed: {
    ...mapGetters(['ticketDatas']),
    validTickets(sku) {
      // return [];
      return this.ticketDatas(sku);
    },
  },
};
</script>
