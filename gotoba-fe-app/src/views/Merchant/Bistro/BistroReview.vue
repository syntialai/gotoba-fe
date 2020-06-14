<template>
  <div class="restaurant-review">
    <review-detail-group :data="restaurantData" />
  </div>
</template>

<script>
import ReviewDetailGroup from '../../../components/User/Review/ReviewDetailGroup.vue';

export default {
  name: 'RestaurantReview',
  components: {
    ReviewDetailGroup,
  },
  computed: {
    restaurantData() {
      return this.$store.getters.restaurantData;
    },
  },
};
</script>
