<template>
  <div class="restaurant-profile">
    <profile-detail :data="restaurantData" />

    <restaurant-menu-card-group :restaurantMenu="restaurantMenu" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';
import RestaurantMenuCardGroup from '../../../components/Merchant/Data/RestaurantMenuCardGroup.vue';

export default {
  name: 'Bistro',
  components: {
    ProfileDetail,
    RestaurantMenuCardGroup,
  },
  computed: {
    ...mapGetters(['restaurantData', 'restaurantMenu', 'userInfo']),
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.userInfo.sku);
    this.getRestaurantMenu(this.userInfo.sku);
  },
  methods: {
    ...mapActions(['getRestaurantDataByMerchantSku', 'getRestaurantMenus']),
  },
};
</script>
