<template>
  <div class="show-data-count d-flex align-items-center">
    <div>Show</div>
    <b-form-select
      v-model="selected"
      :options="options"
      class="mx-2"
      style="width: 72px"
    ></b-form-select>
    <div>entries</div>
  </div>
</template>

<script>
export default {
  name: 'ShowDataCount',
  props: {
    perPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      selected: this.perPage,
      options: [5, 10, 20, 50],
    };
  },
};
</script>
