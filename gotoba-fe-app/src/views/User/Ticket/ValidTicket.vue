<template>
  <div class="valid-ticket pt-2 pb-2 min-vh-100 bg-white">
    <card-ticket
      v-for="ticket in validTickets"
      :key="ticket.title"
      :ticket="ticket"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isToday, isPassed } from '../../../utils/filter';
import CardTicket from '../../../components/User/Ticket/CardTicket.vue';

export default {
  name: 'ValidTicket',
  components: {
    CardTicket,
  },
  computed: {
    ...mapGetters(['ticketDatas', 'userSku']),
    validTickets() {
      return this.ticketDatas.map((ticket) => isToday(ticket.expiredDate)
      && isPassed(ticket.expiredDate));
    },
  },
  created() {
    this.getTicketData(this.userSku);
  },
  methods: {
    ...mapActions(['getTicketData']),
  },
};
</script>
