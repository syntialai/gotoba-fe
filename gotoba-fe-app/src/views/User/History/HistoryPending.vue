<template>
  <div class="history-pending">
    <card-history-group histories="" />
  </div>
</template>

<script>
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'HistoryPending',
  components: {
    CardHistoryGroup,
  },
};
</script>
