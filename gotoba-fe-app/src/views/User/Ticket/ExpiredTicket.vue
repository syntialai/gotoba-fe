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
import { mapActions, mapGetters } from 'vuex';
import { isToday } from '../../../utils/filter';
import CardTicket from '../../../components/User/Ticket/CardTicket.vue';

export default {
  name: 'ExpiredTicket',
  components: {
    CardTicket,
  },
  computed: {
    ...mapGetters(['ticketDatas', 'userInfo']),
    expiredTickets() {
      return this.ticketDatas.map((ticket) => !isToday(ticket.expiredDate));
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
