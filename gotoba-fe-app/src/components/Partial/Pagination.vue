<template>
  <div class="m-3">
    <b-pagination
      v-model="currPage"
      @input="updateCurrentPage"
      :per-page="perPage"
      :total-rows="rows"
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
    rows: Number,
    idControls: String,
  },
  data() {
    return {
      currPage: this.currentPage,
    };
  },
  methods: {
    updateCurrentPage() {
      this.$emit('update:currentPage', this.currPage);
    },
  },
};
</script>
