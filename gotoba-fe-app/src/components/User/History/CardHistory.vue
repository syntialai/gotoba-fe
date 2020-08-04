<template>
  <div class="card-history p-3">
    <div class="date semibold font-color-black-87">{{ dateFormat }}</div>
    <div class="history-by-day-group bg-white p-2">
      <div
        v-for="details in history"
        :key="details.id"
      >
        <router-link :to="goToDetails(details.sku)">
          <div class="d-flex justify-content-around">
            <div class="price w-50 align-center font-color-blue-secondary">
              {{ formatPrice(details.total) }}
            </div>
            <div class="info font-size-14 w-50 border-left-gray-young">
              <div class="id semibold font-color-black-78 align-right">
                ID #{{ details.id }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate, formatPrice } from '../../../utils/filter';

export default {
  name: 'CardHistory',
  props: {
    history: Array,
    date: String,
  },
  computed: {
    dateFormat() {
      const dates = formatDate(new Date(this.date)).split(' ');
      dates.shift();
      return dates.join(' ');
    },
  },
  methods: {
    goToDetails(sku) {
      return `/history/details/${sku}`;
    },
    formatPrice,
  },
};
</script>
