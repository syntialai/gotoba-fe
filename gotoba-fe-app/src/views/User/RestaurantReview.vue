<template>
  <div class="restaurant-review">
    <NavigationBack title="Reviews" />

    <ReviewDetailGroup :data="restaurantData" />
  </div>
</template>

<script>
import NavigationBack from '@/components/Partial/NavigationBack.vue';
import ReviewDetailGroup from '@/components/User/ReviewDetailGroup.vue';

export default {
  name: 'RestaurantReview',
  computed: {
    restaurantData() {
      return this.$store.getters.restaurantData;
    },
  },
};
</script>
