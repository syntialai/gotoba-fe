<template>
  <div class="restaurant-card-group">
    <b-card-group>
      <restaurant-card
        v-for="restaurant of restaurantRange"
        :key="restaurant.sku"
        :restaurant="restaurant"
        @click="goToDetails(restaurant.sku)"
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
    start: Number,
    end: Number,
  },
  computed: {
    restaurantRange() {
      return this.restaurants.slice(this.start - 1, this.end);
    },
  },
  methods: {
    goToDetails(sku) {
      this.$router.push(`/admin/restaurant/${sku}`);
    },
  },
};
</script>
