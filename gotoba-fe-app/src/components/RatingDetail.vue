<template>
  <div class="rating-detail m-3">
    <div
      class="title d-flex w-100 border-bottom-gray-young justify-content-between"
    >
      <h3>About</h3>
    </div>
    <div class="d-flex m-3">
      <div class="ratings-big align-center">
        <span class="font-size-48 font-color-blue-primary">{{ rating }}</span>
        <Rating :rate="rating" font-size=16 />
        <span class="font-size-12">{{ totalReviewer }}</span>
      </div>
      <div class="rating-details-group">
        <div v-for="bar in ratingBars" :key="bar.rate">
          <span>{{ bar.rate }}</span>
          <b-progress
            :value="bar.reviewerCount"
            :max="totalReviewer"
            variant="pimary"
          ></b-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';

export default {
  name: 'RatingDetail',
  components: {
    Rating,
  },
};
</script>
