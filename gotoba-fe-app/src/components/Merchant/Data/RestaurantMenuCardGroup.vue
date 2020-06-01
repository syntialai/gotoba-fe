<template>
  <div class="restaurant-menu-card-group d-flex overflow-auto">
    <card-restaurant-menu
      v-for="menu of restaurantMenu"
      :key="menu.id"
      :menu="menu"
    />
  </div>
</template>

<script>
import CardRestaurantMenu from '../Card/CardRestaurantMenu.vue';

export default {
  name: 'RestaurantMenuCardGroup',
  components: {
    CardRestaurantMenu,
  },
  props: {
    restaurantMenu: Array,
  },
};
</script>
