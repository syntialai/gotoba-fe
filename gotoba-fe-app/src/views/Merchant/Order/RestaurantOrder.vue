<template>
  <div class="restaurant-order">
    <card-history
      :history="history"
      :date="index"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RestaurantOrder',
  components: {
  },
  computed: {
    ...mapGetters(['merchantRestaurantOrder']),
  },
};
</script>
