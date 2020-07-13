<template>
  <div class="restaurant-profile">
    <profile-detail :data="restaurantData" />

    <restaurant-menu-card-group
      v-if="restaurantMenu"
      :restaurantMenu="restaurantMenu"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';
import RestaurantMenuCardGroup from '../../../components/Merchant/Data/RestaurantMenuCardGroup.vue';

export default {
  name: 'RestaurantProfile',
  components: {
    ProfileDetail,
    RestaurantMenuCardGroup,
  },
  computed: {
    ...mapGetters(['restaurantData', 'restaurantMenu']),
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.$route.params.sku);
    this.getRestaurantMenu(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getRestaurantDataByMerchantSku', 'getRestaurantMenu']),
  },
};
</script>
