<template>
  <div class="restaurant-review">
    <review-detail-group :data="restaurant" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ReviewDetailGroup from '../../../components/User/Review/ReviewDetailGroup.vue';

export default {
  name: 'RestaurantReview',
  components: {
    ReviewDetailGroup,
  },
  computed: {
    ...mapGetters(['restaurantData', 'restaurantReview']),
  },
  created() {
    this.getRestaurantDataBySku(this.$route.params.sku);
    this.getRestaurantReview(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getRestaurantDataBySku', 'getRestaurantReview']),
    restaurant() {
      const data = this.restaurantData;
      const review = this.restaurantReview;

      return Object.assign(data, review);
    },
  },
};
</script>
