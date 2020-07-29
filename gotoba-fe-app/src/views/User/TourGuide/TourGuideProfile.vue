<template>
  <div class="tour-guide-profile">
    <div v-if="tourGuideData">
      <card-profile-tour-guide :tourGuide="tourGuideData" class="my-2" />

      <about-tour-guide-detail :data="tourGuideData" class="mt-1 mb-2" />

      <!-- <div class="rating-and-reviews mt-1 mb-2">
        <div
          class="title d-flex w-100 border-bottom-gray-young justify-content-between"
        >
          <h3>Ratings and Reviews</h3>
          <router-link :to="goToReviews">
            <b-icon
              icon="arrow-right-short"
              class="icon-black-60"
            ></b-icon>
          </router-link>
        </div>

        <rating-profile-detail />

        <div class="recent-reviews mt-3">
          <div class="title bold font-color-blue-secondary">Recent reviews</div>
          <div class="recent-reviews-group mt-3" v-if="tourGuideReview > 0">
            <user-review-detail
              v-for="review in tourGuideReview"
              :key="review.userName"
              v-bind="review"
            />
          </div>
        </div>
      </div> -->
    </div>

    <div v-else class="vh-100 d-flex">
      <div class="align-self-center align-center">
        <div class="image-no-data">
          <img
            src="@/assets/img/illustrate/no-data.png"
            alt="No-Data"
            width="50%"
          >
        </div>
        <div class="info-no-data m-3">
          <div class="font-color-black-60">
            <div class="semibold">
              Tour guide can't be found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AboutTourGuideDetail from '../../../components/User/TourGuide/AboutTourGuideDetail.vue';
import CardProfileTourGuide from '../../../components/User/TourGuide/CardProfileTourGuide.vue';
// import RatingProfileDetail from '../../../components/User/Profile/RatingProfileDetail.vue';
// import UserReviewDetail from '../../../components/User/Review/UserReviewDetail.vue';

export default {
  name: 'TourGuideProfile',
  components: {
    AboutTourGuideDetail,
    CardProfileTourGuide,
    // RatingProfileDetail,
    // UserReviewDetail,
  },
  computed: {
    ...mapGetters(['tourGuideData', 'tourGuideReview']),
    goToReviews() {
      return `/tour-guide/${this.tourGuideData.sku}/review`;
    },
  },
  created() {
    this.getTourGuideBySku(this.$route.params.sku);
    // this.getTourGuideReview(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getTourGuideBySku', 'getTourGuideReview']),
  },
};
</script>
