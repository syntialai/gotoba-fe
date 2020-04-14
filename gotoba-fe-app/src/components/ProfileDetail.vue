<template>
  <div class="profile-detail">

  </div>
</template>

<script>
import CardProfileDetail from '@/components/CardProfileDetail.vue';
import AboutProfileDetail from '@/components/AboutProfileDetail.vue';
import RatingDetail from '@/components/RatingDetail.vue';
import UserReviewDetail from '@/components/UserReviewDetail.vue';

export default {
  name: 'ProfileDetail',
  components: {
    CardProfileDetail,
    AboutProfileDetail,
    RatingDetail,
    UserReviewDetail,
  },
};
</script>
