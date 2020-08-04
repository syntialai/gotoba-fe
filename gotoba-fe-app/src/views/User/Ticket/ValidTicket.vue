<template>
  <div class="valid-ticket py-2 bg-white">
    <div class="card-ticket-group">
      <card-ticket
        v-for="ticket in approvedOrderData.valid"
        :key="ticket.title"
        :ticket="ticket"
      />
    </div>
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
    ...mapGetters(['approvedOrderData']),
  },
};
</script>
