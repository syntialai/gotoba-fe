<template>
  <div class="restaurant-profile">
    <profile-detail :data="restaurantData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';

export default {
  name: 'RestaurantProfile',
  components: {
    ProfileDetail,
  },
  computed: {
    ...mapGetters(['restaurantData']),
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getRestaurantDataByMerchantSku']),
  },
};
</script>
