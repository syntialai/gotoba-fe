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
    ...mapGetters(['restaurantData', 'restaurantReview', 'userInfo']),
    restaurant() {
      return Object.assign(this.restaurantData, this.restaurantReview);
    },
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.userInfo.sku);
    this.getRestaurantReview(this.userInfo.sku);
  },
  methods: {
    ...mapActions(['getRestaurantDataByMerchantSku', 'getRestaurantReview']),
  },
};
</script>
