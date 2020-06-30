<template>
  <div class="restaurant-order">
    <card-history-group :histories="restaurantOrderData" />
  </div>
</template>

<script>
import CardHistoryGroup from '../../../components/User/History/CardHistoryGroup.vue';

export default {
  name: 'RestaurantOrder',
  components: {
    CardHistoryGroup,
  },
};
</script>
