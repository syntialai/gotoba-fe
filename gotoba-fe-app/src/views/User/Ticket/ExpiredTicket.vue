<template>
  <div class="expired-ticket bg-white vh-100 pt-2 pb-2">
    <div class="card-ticket-group">
      <card-ticket
        v-for="ticket in approvedOrderData.expired"
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
  name: 'ExpiredTicket',
  components: {
    CardTicket,
  },
  computed: {
    ...mapGetters(['approvedOrderData']),
  },
};
</script>
