<template>
  <div class="tour-guide-review">
    <review-detail-group :data="tourGuide" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ReviewDetailGroup from '../../../components/User/Review/ReviewDetailGroup.vue';

export default {
  name: 'TourGuideReview',
  components: {
    ReviewDetailGroup,
  },
  computed: {
    ...mapGetters(['tourGuideData', 'tourGuideReview']),
  },
  created() {
    this.getTourGuideBySku(this.$route.params.sku);
    this.getTourGuideReview(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getTourGuideBySku', 'getTourGuideReview']),
    tourGuide() {
      const data = this.tourGuideData;
      const review = this.tourGuideReview;

      return Object.assign(data, review);
    }
  },
};
</script>
