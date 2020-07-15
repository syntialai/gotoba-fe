<template>
  <div class="about-tour-guide-detail bg-white p-3">
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
  name: 'AboutTourGuideDetail',
  props: {
    data: Object,
  },
  computed: {
    items() {
      return [
        {
          language: this.data.language,
          available_location: this.data.availableLocation,
          phone_number: this.data.phone,
          email: this.data.email,
          whatsapp: this.data.whatsapp,
          experience: this.data.experience || '-',
          description: this.data.description || '-',
        },
      ];
    },
  },
};
</script>
