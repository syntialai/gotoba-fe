<template>
  <div class="journey-review">
    <review-detail-group :data="journeyData" />
  </div>
</template>

<script>
import ReviewDetailGroup from '../../../components/User/Review/ReviewDetailGroup.vue';

export default {
  name: 'JourneyReview',
  components: {
    ReviewDetailGroup,
  },
  computed: {
    journeyData() {
      return this.$store.getters.journeyData;
    },
  },
};
</script>
