<template>
  <div class="restaurant-detail">
    <restaurant-card :restaurant="restaurantData" />

    <div class="more-restaurant-info">
      <div class="full-address d-flex justify-content-between">
        <div class="full-address-label font-color-black-60">
          Full Address
        </div>
        <div class="full-address-value font-color-black-87 semibold pl-4">
          {{ restaurantData.address }}
        </div>
      </div>

      <div class="hours-open d-flex justify-content-between">
        <div class="hours-open-label font-color-black-60">
          Hours
        </div>
        <div class="hours-open-value font-color-black-87 semibold pl-4">
          {{ restaurantData.hoursOpen }}
        </div>
      </div>

      <div class="phone-number d-flex justify-content-between">
        <div class="phone-number-label font-color-black-60">
          Phone Number
        </div>
        <div class="phone-number-value font-color-black-87 semibold pl-4">
          {{ restaurantData.phone }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RestaurantCard from '../../components/Admin/Card/RestaurantCard.vue';

export default {
  name: 'RestaurantDetail',
  components: {
    RestaurantCard,
  },
  computed: {
    ...mapGetters(['restaurantData', 'restaurantMenu']),
  },
  created() {
    this.getRestaurantDataBySku(this.$route.params.sku);
    this.getRestaurantMenus(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getRestaurantDataBySku', 'getRestaurantMenus']),
  },
};
</script>
