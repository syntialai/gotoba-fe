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
import CardTicket from './CardTicket.vue';

export default {
  name: 'ValidTicket',
  components: {
    CardTicket,
  },
  computed: {
    validTickets() {
      return [];
    },
  },
};
</script>
