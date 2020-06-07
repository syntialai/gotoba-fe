<template>
  <div class="tour-guide-review">
    <review-detail-group :data="tourGuideData" />
  </div>
</template>

<script>
import ReviewDetailGroup from '../../../components/User/ReviewDetailGroup.vue';

export default {
  name: 'TourGuideReview',
  components: {
    ReviewDetailGroup,
  },
  computed: {
    tourGuideData() {
      return this.$store.getters.tourGuideData;
    },
  },
};
</script>
