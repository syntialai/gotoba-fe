<template>
  <div class="journey-review">
    <review-detail-group :data="journeyData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ReviewDetailGroup from '../../../components/User/Review/ReviewDetailGroup.vue';

export default {
  name: 'JourneyReview',
  components: {
    ReviewDetailGroup,
  },
  computed: {
    ...mapGetters(['journeyData', 'journeyReview']),
    journeyData(sku) {
      const data = this.journeyData(sku);
      const review = this.journeyReview(sku);

      return Object.assign(data, review);
    },
  },
};
</script>
