<template>
  <div class="restaurant-profile position-relative">
    <div v-if="restaurantData && restaurantData.length > 0">
      <profile-detail :data="restaurantData" />

      <div class="menu">
        <div class="menu" v-if="restaurantMenu">
          <restaurant-menu-card-group
            :restaurantMenu="restaurantMenu"
          />
        </div>
        <div class="add-menu" v-else>
          <div class="rating-and-reviews mb-2 p-3 bg-white">
            <div
              class="title d-flex w-100 border-bottom-gray-young justify-content-between"
            >
              <h5>Menus</h5>
              <div class="add">
                <b-button variant="link">Add</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!restaurantData"
      class="p-3 vh-100 align-center bg-white"
    >
      <img
        src="@/assets/img/illustrate/restaurant.png"
        alt="Restaurant"
        class="restaurant-image mt-5"
      >
      <div class="info semibold mt-4">
        Let's started by edit info for your Bistro
      </div>
      <b-button
        block
        to="/merchant/bistro/edit"
        class="custom-btn-primary mt-3 text-white"
      >
        EDIT BISTRO
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';
import RestaurantMenuCardGroup from '../../../components/Merchant/Data/RestaurantMenuCardGroup.vue';

export default {
  name: 'Bistro',
  components: {
    ProfileDetail,
    RestaurantMenuCardGroup,
  },
  computed: {
    ...mapGetters(['restaurantData', 'restaurantMenu', 'userSku']),
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.userSku);
    this.getRestaurantMenu(this.userSku);
  },
  methods: {
    ...mapActions(['getRestaurantDataByMerchantSku', 'getRestaurantMenu']),
  },
};
</script>

<style lang="scss" scoped>
.restaurant-image {
  width: 100%;
}

@media screen and (min-width: 475px) {
  .restaurant-image {
    width: 75%;
  }
}

@media screen and (min-width: 600px) {
  .restaurant-image {
    width: 60%;
  }
}

@media screen and (min-width: 768px) {
  .restaurant-image {
    width: 50%;
  }
}
</style>
