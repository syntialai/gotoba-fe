<template>
  <div class="about-profile-detail bg-white p-3">
    <div class="title w-100 border-bottom-gray-young">
      <h3>About</h3>
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
        description: data.description,
        full_address: data.fullAddress,
        hours_open: data.hoursOpen,
        telephone: data.telephone,
      };
    },
  },
};
</script>
