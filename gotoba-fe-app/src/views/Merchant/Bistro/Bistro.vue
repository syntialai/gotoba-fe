<template>
  <div class="restaurant-profile position-relative margin-80">
    <div v-if="restaurantData && restaurantData.length > 0">
      <profile-detail
        :data="restaurantData[0]"
        :promotions="ticketRestaurantByMerchant"
        v-on:showMenuModal="showMenuModal"
      />

      <div class="menus">
        <div class="menu" v-if="restaurantMenus">
          <restaurant-menu-card-group
            :add="true"
            :restaurantMenu="restaurantMenus"
            v-on:showPromotionModal="showPromotionModal"
          />
        </div>
      </div>

      <promotion-modal :show="promotion" />

      <menu-modal :show="menu" />

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
import PromotionModal from '../../../components/Merchant/Modal/PromotionModal.vue';
import MenuModal from '../../../components/Merchant/Modal/MenuModal.vue';

export default {
  name: 'Bistro',
  components: {
    ProfileDetail,
    RestaurantMenuCardGroup,
    PromotionModal,
    MenuModal,
  },
  computed: {
    ...mapGetters([
      'restaurantData',
      'ticketRestaurantByMerchant',
      'restaurantMenus',
      'userSku',
    ]),
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.userSku);
    this.getTicketByMerchant(this.userSku);
    this.getRestaurantMenu(this.userSku);
  },
  data() {
    return {
      menu: false,
      promotion: false,
    };
  },
  methods: {
    ...mapActions([
      'getRestaurantDataByMerchantSku',
      'getRestaurantMenu',
      'getTicketByMerchant',
    ]),
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
