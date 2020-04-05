<template>
  <div class="history-success">
    <div
      class="history-by-day"
      v-for="history in historyGroup"
      :key="history.date.match(/[^\s]/g).join('')"
    >
      <div class="date semibold font-color-black-87">{{ history.date }}</div>
      <div class="history-by-day-group bg-white p-2">
        <div
          class="d-flex"
          v-for="details in history.details"
          :key="details.id"
        >
          <div class="info font-size-14">
            <div class="id semibold">{{ details.id }}</div>
            <div class="category font-color-black-60">{{ details.category }}</div>
          </div>
          <div class="price font-size-18 semibold align-self-center">
            {{ details.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistorySuccess',
};
</script>
