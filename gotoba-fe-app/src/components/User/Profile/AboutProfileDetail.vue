<template>
  <div class="about-profile-detail bg-white p-3">
    <div class="title w-100 border-bottom-gray-young">
      <h5>About</h5>
    </div>
    <b-table stacked
      :items="items"
      class="border-none font-color-black-60"
    ></b-table>
  </div>
</template>

<script>
export default {
  name: 'AboutProfileDetail',
  props: {
    data: Object,
  },
  computed: {
    items() {
      return {
        description: this.data.description,
        full_address: this.data.fullAddress,
        hours_open: this.data.hoursOpen,
        telephone: this.data.telephone,
      };
    },
  },
};
</script>
