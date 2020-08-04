<template>
  <div class="tour-guide-card">
    <router-link :to="goToTourGuideDetail">
      <data-card :data="tourGuideData" :otherIcon="tourGuide.gender" />
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
        name: this.tourGuide.name,
        image: this.tourGuide.image,
        location: this.tourGuide.location,
        other: this.tourGuide.age,
        rating: this.tourGuide.rating,
      };
    },
    goToTourGuideDetail() {
      return `/admin/tour-guide/${this.tourGuide.sku}`;
    },
  },
};
</script>
