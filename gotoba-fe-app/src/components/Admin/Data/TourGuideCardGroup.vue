<template>
  <div class="tour-guide-card-group">
    <b-card-group>
      <tour-guide-card
        v-for="tourGuide of tourGuides"
        :key="tourGuide.sku"
        :tourGuide="tourGuide"
        @click="goToDetails(tourGuide.sku)"
      />
    </b-card-group>
  </div>
</template>

<script>
import TourGuideCard from '../Card/TourGuideCard.vue';

export default {
  name: 'TourGuideCardGroup',
  components: {
    TourGuideCard,
  },
  props: {
    tourGuides: Array,
  },
  methods: {
    goToDetails(sku) {
      this.$router.push(`/admin/tour-guide/${sku}`);
    },
  },
};
</script>
