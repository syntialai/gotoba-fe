<template>
  <div class="rating-detail d-flex m-3">
    <div class="ratings-big align-center">
      <span class="font-size-48 font-color-blue-primary">
        {{ averageOfRatings(ratingBars) }}
      </span>
      <Rating :rate="rating" font-size=16 />
      <span class="font-size-12">{{ totalReviewer }}</span>
    </div>
    <div class="rating-details-group">
      <div v-for="(rate, index) in ratingBars.reverse()" :key="rate">
        <span>{{ 5 - index }}</span>
        <b-progress
          :value="rate"
          :max="totalReviewer"
          variant="pimary"
        ></b-progress>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Partial/Rating.vue';
import averageOfRatings from '@/utils/rating';

export default {
  name: 'RatingProfileDetail',
  components: {
    Rating,
  },
  data() {
    return {
      ratingBars: [ 60, 50, 2, 10, 500 ],
    };
  },
  computed: {
    averageOfRatings,
    totalReviewer() {
      let sumOfRatings = 0;
      ratingBars.forEach((rate) => sumOfRatings += rate);
      return sumOfRatings;
    },
  },
};
</script>
