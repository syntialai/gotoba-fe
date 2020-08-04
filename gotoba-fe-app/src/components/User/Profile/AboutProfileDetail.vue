<template>
  <div class="about-profile-detail bg-white px-3 pt-3">
    <div class="title w-100 border-bottom-gray-young">
      <h5>About</h5>
    </div>
    <b-table stacked
      :items="items"
      class="border-none white-space-pre"
    ></b-table>
  </div>
</template>

<script>
import { toCapitalize } from '../../../utils/filter';

export default {
  name: 'AboutProfileDetail',
  props: {
    data: Object,
  },
  computed: {
    items() {
      return [
        {
          description: this.data.description || '-',
          full_address: this.data.address,
          hours_open: this.hoursOpen,
          telephone: this.data.phone || '-',
        },
      ];
    },
    hoursOpen() {
      let hoursOpenStr = '';

      Object.entries(this.data.hoursOpen)
        .forEach(([key, value]) => {
          hoursOpenStr += `${toCapitalize(key)} = ${value[0]} - ${value[1]}\n`;
        });

      return hoursOpenStr;
    },
  },
};
</script>

<style lang="scss">
.white-space-pre {
  white-space: pre-wrap;
}
</style>
