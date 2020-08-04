<template>
  <div class="card-history-group">
    <div
      class="history-by-day"
      v-for="(history, index) in historyByDate"
      :key="index"
    >
      <card-history
        :history="history"
        :date="index"
      />
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
  computed: {
    historyByDate() {
      const history = {};
      this.histories.forEach((item) => {
        const date = item.createdAt.split('T')[0];
        if (history[date]) {
          history[date].push(item);
        } else {
          history[date] = [item];
        }
      });
      return history;
    },
  },
};
</script>
