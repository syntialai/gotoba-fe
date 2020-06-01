<template>
  <div class="restaurant-profile">
    <profile-detail :data="restaurantData" />

    <restaurant-menu-card-group :restaurantMenu="restaurantMenu" />
  </div>
</template>

<script>
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';
import RestaurantMenuCardGroup from '../../../components/Merchant/Data/RestaurantMenuCardGroup.vue';

export default {
  name: 'Bistro',
  components: {
    ProfileDetail,
    RestaurantMenuCardGroup,
  },
  computed: {
    restaurantData() {
      return this.$store.getters.restaurantData;
    },
    restaurantMenu() {
      return this.$store.getters.restaurantMenu;
    },
  },
};
</script>
