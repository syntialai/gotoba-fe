<template>
  <div class="journey-review">
    <review-detail-group :data="journey" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ReviewDetailGroup from '../../../components/User/Review/ReviewDetailGroup.vue';

export default {
  name: 'JourneyReview',
  components: {
    ReviewDetailGroup,
  },
  computed: {
    ...mapGetters(['journeyDataBySku', 'journeyReview']),
  },
  created() {
    this.getJourneyDataBySku(this.$route.params.sku);
    this.getJourneyReview(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getJourneyDataBySku', 'getJourneyReview']),
    journey() {
      const data = this.journeyDataBySku;
      const review = this.journeyReview;

      return Object.assign(data, review);
    },
  },
};
</script>
