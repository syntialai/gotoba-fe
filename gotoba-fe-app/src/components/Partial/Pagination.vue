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
    currentPage: Number,
    perPage: Number,
    idControls: String,
  },
};
</script>
