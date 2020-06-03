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
      // return this.$store.getters.restaurantData;
      return {
        reviews: [{
          userImg: '',
          userName: 'Syntia',
          rating: 5.0,
          comment: 'Good',
          createdAt: Date('12-2-2019'),
        }],
      };
    },
    restaurantMenu() {
      return this.$store.getters.restaurantMenus;
    },
  },
};
</script>
