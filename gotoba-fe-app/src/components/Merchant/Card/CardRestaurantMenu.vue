<template>
  <div class="card-restaurant-menu">
    <b-card
      :img-src="imageUrl"
      :img-alt="'Image-' + menu.name"
      img-top
      img-height="99px"
      img-width="132px"
      class="box-shadow border-square-10"
    >
      <b-card-title
        :title="menu.name"
        class="font-size-14 font-color-black-87 semibold px-2 mt-2"
      ></b-card-title>
      <b-card-sub-title
        :sub-title="menu.category"
        class="font-size-12 font-color-black-60 px-2"
      ></b-card-sub-title>
      <b-card-text class="font-color-orange-accent font-size-14 semibold px-2">
        {{ menu.harga }}
      </b-card-text>
    </b-card>
  </div>
</template>


<script>
import api from '../../../api/api';

export default {
  name: 'CardRestaurantMenu',
  props: {
    menu: Object,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.menu.image);
    },
  },
};
</script>
