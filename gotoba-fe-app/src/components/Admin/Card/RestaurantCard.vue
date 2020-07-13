<template>
  <div class="restaurant-card">
    <data-card :data="restaurantData" otherIcon="hamburger" />
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
        location: this.restaurant.location,
        other: this.restaurant.bistroType,
        rating: this.restaurant.rating || null,
      };
    },
  },
};
</script>
