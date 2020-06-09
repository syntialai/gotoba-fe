<template>
  <div class="restaurant-review">
    <review-detail-group :data="restaurantData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ReviewDetailGroup from '../../../components/User/Review/ReviewDetailGroup.vue';

export default {
  name: 'RestaurantReview',
  components: {
    ReviewDetailGroup,
  },
  computed: {
    ...mapGetters(['restaurantData', 'restaurantReview']),
    restaurantData(sku) {
      const data = this.restaurantData(sku);
      const review = this.restaurantReview(sku);

      return Object.assign(data, review);
    },
  },
};
</script>
