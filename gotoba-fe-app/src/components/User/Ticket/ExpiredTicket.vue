<template>
  <div class="expired-ticket pt-2 pb-2">
    <CardTicket
      v-for="ticket in expiredTickets"
      :key="ticket.title"
      v-bind="ticket"
    />
  </div>  
</template>

<script>
import CardTicket from '@/components/User/Ticket/ValidTicket.vue';

export default {
  name: 'ExpiredTicket',
  components: {
    CardTicket,
  },
  computed: {
    expiredTickets: ,
  }
};
</script>
