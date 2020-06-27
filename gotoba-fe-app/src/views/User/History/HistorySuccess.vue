<template>
  <div class="history-success">
    <card-history-group histories="" />
  </div>
</template>

<script>
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'HistorySuccess',
  components: {
    CardHistoryGroup,
  },
};
</script>
