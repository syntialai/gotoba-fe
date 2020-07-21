<template>
  <div class="card-restaurant-menu">
    <b-card
      :img-src="imageUrl"
      :img-alt="'Image-' + menu.name"
      img-top
      class="box-shadow border-square-10"
    >
      <b-card-img
        :src="menu.image"
        :alt="menu.name"
        top
        height="99px"
        width="132px"
      />
      <b-card-title
        :title="menu.name"
        class="font-size-14 font-color-black-87 semibold"
      ></b-card-title>
      <b-card-sub-title
        :sub-title="menu.category"
        class="font-size-12 font-color-black-60"
      ></b-card-sub-title>
      <b-card-text class="font-color-orange-accent font-size-14 semibold">
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
