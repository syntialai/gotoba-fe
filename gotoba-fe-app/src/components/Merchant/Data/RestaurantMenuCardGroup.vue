<template>
  <div class="restaurant-menu-card-group p-3 bg-white">
    <div
      class="title d-flex w-100 border-bottom-gray-young justify-content-between"
    >
      <h5>Menus</h5>
      <div class="add" v-if="add">
        <b-button
          variant="link"
          @click="openModal"
        >Add</b-button>
      </div>
    </div>
    <div class="menu-group d-flex overflow-auto mt-3">
      <card-restaurant-menu
        v-for="menu of restaurantMenu"
        :key="menu.id"
        :menu="menu"
      />
    </div>
  </div>
</template>

<script>
import CardRestaurantMenu from '../Card/CardRestaurantMenu.vue';

export default {
  name: 'RestaurantMenuCardGroup',
  components: {
    CardRestaurantMenu,
  },
  props: {
    restaurantMenu: Array,
    add: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openModal() {
      this.$emit('showMenuModal', true);
    },
  },
};
</script>
