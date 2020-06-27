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
import { mapActions, mapGetters } from 'vuex';
import { isToday } from '../../../utils/filter';
import CardTicket from '../../../components/User/Ticket/CardTicket.vue';

export default {
  name: 'ValidTicket',
  components: {
    CardTicket,
  },
  computed: {
    ...mapGetters(['ticketDatas', 'userInfo']),
    validTickets() {
      return this.ticketDatas.map((ticket) => isToday(ticket.expiredDate));
    },
  },
  created() {
    this.getTicketData(this.userInfo.sku);
  },
  methods: {
    ...mapActions(['getTicketData']),
  },
};
</script>
