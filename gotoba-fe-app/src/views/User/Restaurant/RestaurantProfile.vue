<template>
  <div class="restaurant-profile">
    <div v-if="isExist">
      <profile-detail
        :data="restaurantData"
        :promotions="[]"
      />
      <div class="menus">
        <div class="menu" v-if="restaurantMenus">
          <restaurant-menu-card-group
            :restaurantMenu="restaurantMenus"
          />
        </div>
      </div>
    </div>

    <div v-else class="vh-100 d-flex">
      <div class="align-self-center align-center">
        <div class="image-no-data">
          <img
            src="@/assets/img/illustrate/no-data.png"
            alt="No-Data"
            width="50%"
          >
        </div>
        <div class="info-no-data m-3">
          <div class="font-color-black-60">
            <div class="semibold">
              The restaurant can't be found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';
import RestaurantMenuCardGroup from '../../../components/Merchant/Data/RestaurantMenuCardGroup.vue';

export default {
  name: 'RestaurantProfile',
  components: {
    ProfileDetail,
    RestaurantMenuCardGroup,
  },
  computed: {
    ...mapGetters(['restaurantData', 'restaurantMenus']),
    isExist() {
      return this.restaurantData;
    },
  },
  created() {
    this.getRestaurantDataBySku(this.$route.params.sku);
    this.getRestaurantMenu(this.$route.params.sku);
  },
  methods: {
    ...mapActions([
      'getRestaurantDataBySku',
      'getRestaurantMenu',
    ]),
  },
};
</script>
