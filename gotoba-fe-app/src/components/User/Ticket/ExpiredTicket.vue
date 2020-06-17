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
import CardTicket from './CardTicket.vue';

export default {
  name: 'ExpiredTicket',
  components: {
    CardTicket,
  },
  computed: {
    expiredTickets() {
      return [];
    },
  },
};
</script>
