<template>
  <div class="restaurant-detail">
    <restaurant-card :restaurant="restaurant" />

    <div class="more-restaurant-info">
      <div class="full-address d-flex justify-content-between">
        <div class="full-address-label font-color-black-60">
          Full Address
        </div>
        <div class="full-address-value font-color-black-87 semibold pl-4">
          {{ restaurant.address }}
        </div>
      </div>

      <div class="hours-open d-flex justify-content-between">
        <div class="hours-open-label font-color-black-60">
          Hours
        </div>
        <div class="hours-open-value font-color-black-87 semibold pl-4">
          {{ restaurant.hoursOpen }}
        </div>
      </div>

      <div class="phone-number d-flex justify-content-between">
        <div class="phone-number-label font-color-black-60">
          Phone Number
        </div>
        <div class="phone-number-value font-color-black-87 semibold pl-4">
          {{ restaurant.phoneNumber }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantCard from '../../components/Admin/Card/RestaurantCard.vue';

export default {
  name: 'RestaurantDetail',
  components: {
    RestaurantCard,
  },
  data() {
    return {
      restaurant: {},
    };
  },
};
</script>
