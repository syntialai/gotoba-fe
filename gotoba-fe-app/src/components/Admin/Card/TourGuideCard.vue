<template>
  <div class="tour-guide-card">
    <router-link :to="goToTourGuideDetail">
      <data-card :data="tourGuide" :otherIcon="tourGuide.gender" />
    </router-link>
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
        other: this.tourGuide.age.toString(),
        rating: this.tourGuide.rating,
      };
    },
    goToTourGuideDetail() {
      return `/admin/tour-guide/${this.tourGuide.sku}`;
    },
  },
};
</script>
