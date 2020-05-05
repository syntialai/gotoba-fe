<template>
  <div class="restaurant-profile">
    <profile-detail :data="restaurantData" />
  </div>
</template>

<script>
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';

export default {
  name: 'RestaurantProfile',
  components: {
    ProfileDetail,
  },
  computed: {
    restaurantData() {
      return this.$store.getters.restaurantData;
    },
  },
};
</script>