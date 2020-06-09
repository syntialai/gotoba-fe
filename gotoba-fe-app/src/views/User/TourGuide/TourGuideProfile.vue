<template>
  <div class="tour-guide-profile">
    <card-profile-tour-guide :tourGuide="tourGuide" class="my-2" />

    <about-tour-guide-detail :data="tourGuide" class="mt-1 mb-2" />

    <div class="rating-and-reviews mt-1 mb-2">
      <div
        class="title d-flex w-100 border-bottom-gray-young justify-content-between"
      >
        <h3>Ratings and Reviews</h3>
        <b-icon
          icon="arrow-right-short"
          class="icon-black-60"
          href=""
        ></b-icon>
      </div>

      <rating-profile-detail />

      <div class="recent-reviews mt-3">
        <div class="title bold font-color-blue-secondary">Recent reviews</div>
        <div class="recent-reviews-group mt-3" v-if="tourGuide.reviews > 0">
          <user-review-detail
            v-for="review in tourGuide.reviews"
            :key="review.userName"
            v-bind="review"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AboutTourGuideDetail from '../../../components/User/TourGuide/AboutTourGuideDetail.vue';
import CardProfileTourGuide from '../../../components/User/TourGuide/CardProfileTourGuide.vue';
import RatingProfileDetail from '../../../components/User/Profile/RatingProfileDetail.vue';
import UserReviewDetail from '../../../components/User/Review/UserReviewDetail.vue';

export default {
  name: 'TourGuideProfile',
  components: {
    AboutTourGuideDetail,
    CardProfileTourGuide,
    RatingProfileDetail,
    UserReviewDetail,
  },
  computed: {
    ...mapGetters(['tourGuideData']),
  },
  method: {
    tourGuide(sku) {
      return tourGuideData(sku);
    },
  },
  mounted() {
    tourGuide(sku);
  },
};
</script>
