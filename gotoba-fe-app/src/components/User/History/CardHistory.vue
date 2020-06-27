<template>
  <div class="card-history">
    <div class="date semibold font-color-black-87">{{ history.date }}</div>
    <div class="history-by-day-group bg-white p-2">
      <div
        class="d-flex"
        v-for="details in history.details"
        :key="details.id"
      >
        <div class="price w-50 align-center">{{ details.price }}</div>
        <div class="info font-size-14 border-left-gray-young">
          <div class="id semibold">{{ details.id }}</div>
          <div class="category font-color-black-60">{{ details.category }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardHistory',
  props: {
    history: Object,
  },
};
</script>
