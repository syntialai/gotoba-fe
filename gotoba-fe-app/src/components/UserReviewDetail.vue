<template>
  <div class="review-detail">
    <div class="profile d-flex mb-2">
      <img
        :src="review.userImg"
        :alt="review.userName"
        class="border-circle"
        width="16px" height="16px"
      />
      <span class="pl-1 semibold font-size-12">{{ review.userName }}</span>
    </div>
    <div class="ratings d-flex align-items-center mb-1">
      <Rating :rate="review.rating" font-size="16" />
      <span class="date-reviewed font-size-10">{{ review.dateReviewed }}</span>
    </div>
    <div class="comment">
      {{ review.comment }}
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';

export default {
  name: 'UserReviewDetail',
  data() {
    return {
      review: {
        userName: '',
        userImg: '',
        dateReviewed: '',
        rating: '',
        comment: '',
      },
    };
  },
};
</script>
