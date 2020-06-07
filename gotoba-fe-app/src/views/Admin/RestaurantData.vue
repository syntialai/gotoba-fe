<template>
  <div class="restaurant-data">
    <show-data-count
      :perPage="perPage"
      class="my-3"
    />

    <restaurant-card-group id="restaurant-data-group" :restaurants="restaurants" />

    <div class="info">
      Showing {{ (currentPage - 1) * perPage + 1 }} to
      {{ currentPage * perPage }} of
      50 entries
      <!-- {{ users.length }} entries -->
    </div>

    <pagination
      :currentPage="currentPage"
      :perPage="perPage"
      class="my-3"
      idControls="restaurant-data-group"
    />
  </div>
</template>

<script>
import RestaurantCardGroup from '../../components/Admin/Data/RestaurantCardGroup.vue';
import Pagination from '../../components/Partial/Pagination.vue';
import ShowDataCount from '../../components/Admin/Data/ShowDataCount.vue';

export default {
  name: 'RestaurantData',
  components: {
    RestaurantCardGroup,
    Pagination,
    ShowDataCount,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 1,
    };
  },
  computed: {
    restaurants() {
      return this.$store.getters.restaurantDatas;
    },
  },
};
</script>
