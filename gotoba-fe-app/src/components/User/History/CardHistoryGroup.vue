<template>
  <div class="card-history-group">
    <div
      class="history-by-day"
      v-for="history in histories"
      :key="history.date"
    >
      <card-history :history="history" />
    </div>
  </div>
</template>

<script>
import CardHistory from './CardHistory.vue';

export default {
  name: 'CardHistoryGroup',
  components: {
    CardHistory,
  },
  props: {
    histories: Array,
  },
};
</script>
