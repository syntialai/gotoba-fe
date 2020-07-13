<template>
  <div class="restaurant-profile position-relative">
    <div v-if="restaurantData">
      <profile-detail
        v-if="restaurantData"
        :data="restaurantData"
      />

      <restaurant-menu-card-group
        v-if="restaurantMenu"
        :restaurantMenu="restaurantMenu"
      />
    </div>

    <div v-else class="p-3" style="margin-top: 100px;">
      <div class="info semibold mt-5 align-center">
        Let's started by adding your Bistro Profile
      </div>
      <b-button
        block
        @click="toEditBistro"
        class="custom-btn-primary mt-4"
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
    toEditBistro() {
      this.$router.push('/merchant/bistro/edit');
    },
  },
};
</script>
