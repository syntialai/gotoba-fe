<template>
  <div class="m-3">
    <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      :aria-controls="idControls"
      first-number
      last-number
      align="right"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    idControls: String,
  },
};
</script>
