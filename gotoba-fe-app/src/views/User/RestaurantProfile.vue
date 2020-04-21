<template>
  <div class="restaurant-profile">
    <NavigationBack :title="restaurantData.name" />

    <ProfileDetail :data="restaurantData" />
  </div>
</template>

<script>
import NavigationBack from '@/components/Partial/NavigationBack.vue';
import ProfileDetail from '@/components/User/Profile/ProfileDetail.vue';

export default {
  name: 'RestaurantProfile',
  components: {
    NavigationBack,
    ProfileDetail,
  },
  computed: {
    restaurantData() {
      return this.$store.getters.restaurantData;
    },
  },
};
</script>