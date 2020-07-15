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
      return [
        {
          description: this.data.description,
          full_address: this.data.address,
          hours_open: this.hoursOpen,
          telephone: this.data.phone,
        },
      ];
    },
    hoursOpen() {
      let hoursOpenStr = '';

      const objLength = Object.keys(this.data.hoursOpen).length;
      Object.entries(this.data.hoursOpen)
        .forEach(([key, value], index) => {
          hoursOpenStr += `${key} = ${value[0]} - ${value[1]}`;

          if (index !== objLength - 1) {
            hoursOpenStr += '\n';
          }
        });

      return hoursOpenStr;
    },
  },
};
</script>
