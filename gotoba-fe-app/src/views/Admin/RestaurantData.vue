<template>
  <div class="restaurant-data">
    <show-data-count
      :perPage.sync="perPage"
      class="my-3"
    />

    <restaurant-card-group
      id="restaurant-data-group"
      v-if="restaurantDatas"
      :restaurants="restaurantDatas"
      :start="dataStart"
      :end="dataEnd"
    />

    <div class="info" v-if="restaurantDatas">
      Showing {{ dataStart }} to {{ dataEnd }} of {{ restaurantDatas.length }} entries
    </div>

    <pagination
      v-if="restaurantDatas"
      :currentPage.sync="currentPage"
      :perPage="perPage"
      :rows="restaurantDatas.length"
      class="my-3"
      idControls="restaurant-data-group"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['restaurantDatas']),

    dataStart() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    dataEnd() {
      const end = this.currentPage * this.perPage;

      if (end > this.restaurantDatas.length) {
        return this.restaurantDatas.length;
      }

      return end;
    },
  },
  created() {
    this.getRestaurantData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  methods: {
    ...mapActions(['getRestaurantData']),
  },
};
</script>
