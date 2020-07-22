<template>
  <div class="profile-detail">
    <card-profile-detail
      class="mb-2 mt-2"
      v-bind="data"
      :location="data.address"
    />

    <about-profile-detail
      class="mb-2"
      :data="data"
    />

    <div class="rating-and-reviews mb-2 p-3 bg-white">
      <div
        class="title d-flex w-100 border-bottom-gray-young justify-content-between"
      >
        <h5>Ratings and Reviews</h5>
        <b-icon
          icon="arrow-right-short"
          class="icon-black-60"
          href=""
        ></b-icon>
      </div>

      <rating-profile-detail />

      <!-- <div class="recent-reviews mt-3">
        <div class="title bold font-color-blue-secondary">Recent reviews</div>
        <div class="recent-reviews-group mt-3" v-if="recentReviews > 0">
          <user-review-detail
            v-for="review in recentReviews"
            :key="review.userName"
            v-bind="review"
          />
        </div>
      </div> -->
    </div>

    <div class="promotion mb-2" v-if="promotions.length > 0">
      <div class="title border-bottom-gray-young">
        <h5>Promotions</h5>
      </div>
      <div class="promotion-group">
        <card-promotion
          v-for="promo in promotions"
          :key="promo.sku"
          v-bind="promo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardProfileDetail from './CardProfileDetail.vue';
import AboutProfileDetail from './AboutProfileDetail.vue';
import RatingProfileDetail from './RatingProfileDetail.vue';
// import UserReviewDetail from '../Review/UserReviewDetail.vue';
import CardPromotion from '../CardPromotion.vue';

export default {
  name: 'ProfileDetail',
  components: {
    CardProfileDetail,
    AboutProfileDetail,
    RatingProfileDetail,
    // UserReviewDetail,
    CardPromotion,
  },
  props: {
    data: Object,
  },
  computed: {
    // recentReviews() {
    //   const reviews = this.data.reviews.slice(0);
    //   reviews.sort((a, b) => b.createdAt - a.createdAt);
    //   return reviews.slice(0, 3);
    // },
    promotions() {
      return [];
    },
  },
  methods: {
    hoursOpen(hours) {
      let hoursOpenStr = '';

      Object.entries(hours)
        .forEach(([key, value]) => {
          hoursOpenStr += `${key} = ${value[0]} - ${value[1]}\n`;
        });

      return hoursOpenStr;
    },
    aboutData() {
      const newData = { ...this.data };
      newData.hoursOpen = this.hoursOpen(newData.hoursOpen);

      return newData;
    },
  },
};
</script>
