<template>
  <div class="card-history">
    <div class="date semibold font-color-black-87">{{ date }}</div>
    <div class="history-by-day-group bg-white p-2">
      <div
        class="d-flex"
        v-for="details in history.key"
        :key="details.id"
      >
        <router-link :to="goToDetails(details.orderSku)">
          <div class="price w-50 align-center font-color-blue-secondary">
            {{ details.total }}
          </div>
          <div class="info font-size-14 border-left-gray-young">
            <div class="id semibold font-color-black-78">{{ details.id }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../../utils/filter';

export default {
  name: 'CardHistory',
  props: {
    history: Object,
  },
  computed: {
    key() {
      return Object.keys(this.history)[0];
    },
    date() {
      return formatDate(new Date(this.keys));
    },
  },
  methods: {
    goToDetails(orderSku) {
      return `/${this.$route.path}/${orderSku}`;
    },
  },
};
</script>
