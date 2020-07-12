<template>
  <div class="tour-guide-card">
    <data-card :data="tourGuide" :otherIcon="tourGuide.gender" />
      <!-- gender : male || female -->
  </div>
</template>

<script>
import DataCard from './DataCard.vue';

export default {
  name: 'TourGuideCard',
  components: {
    DataCard,
  },
  props: {
    tourGuide: Object,
  },
  computed: {
    tourGuideData() {
      return {
        image: this.tourGuide.image,
        location: this.tourGuide.location,
        other: this.tourGuide.gender,
        rating: this.tourGuide.rating,
      };
    },
  },
};
</script>
