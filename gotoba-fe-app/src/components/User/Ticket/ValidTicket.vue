<template>
  <div class="valid-ticket pt-2 pb-2">
    <CardTicket
      v-for="ticket in validTickets"
      :key="ticket.title"
      v-bind="ticket"
    />
  </div>
</template>

<script>
import CardTicket from '@/components/User/Ticket/CardTicket.vue';

export default {
  name: 'ValidTicket',
  components: {
    CardTicket,
  },
  computed: {
    validTickets: [],
  },
};
</script>
