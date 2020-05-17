<template>
  <div class="restaurant-card-group">
    <b-card-group>
      <restaurant-card
        v-for="restaurant of restaurants"
        :key="restaurant.sku"
        :restaurant="restaurant"
      />
    </b-card-group>
  </div>
</template>

<script>
import RestaurantCard from '../Card/RestaurantCard.vue';

export default {
  name: 'RestaurantCardGroup',
  components: {
    RestaurantCard,
  },
  props: {
    restaurants: Array,
  },
};
</script>
