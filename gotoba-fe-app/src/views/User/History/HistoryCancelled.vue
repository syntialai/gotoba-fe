<template>
  <div class="history-cancelled">
    <card-history-group histories="" />
  </div>
</template>

<script>
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'HistoryCancelled',
  components: {
    CardHistoryGroup,
  },
};
</script>
