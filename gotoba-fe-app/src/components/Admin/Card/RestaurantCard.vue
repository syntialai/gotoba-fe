<template>
  <div class="restaurant-card">
    <a :href="'/admin/restaurant/' + restaurant.sku">
      <data-card :data="restaurant" otherIcon="hamburger" />
    </a>
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
};
</script>
