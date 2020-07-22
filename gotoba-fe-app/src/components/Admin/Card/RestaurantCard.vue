<template>
  <div class="restaurant-card">
    <router-link :to="goToRestaurantDetail">
      <data-card :data="restaurantData" otherIcon="hamburger" />
    </router-link>
  </div>
</template>

<script>
import DataCard from './DataCard.vue';

export default {
  name: 'RestaurantCard',
  components: {
    DataCard,
  },
  props: {
    restaurant: Object,
  },
  computed: {
    restaurantData() {
      return {
        image: this.restaurant.image,
        location: this.restaurant.address,
        other: this.restaurant.bistroType,
        rating: this.restaurant.rating || null,
      };
    },
    goToRestaurantDetail() {
      return `/admin/restaurant/${this.restaurant.sku}`;
    },
  },
};
</script>
