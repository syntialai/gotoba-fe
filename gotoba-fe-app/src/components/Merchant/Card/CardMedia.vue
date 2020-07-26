<template>
  <div class="card-spot bg-white p-3 my-3">
    <b-media tag="li" vertical-align="center">
      <template v-slot:aside>
        <b-img
          :src="imageUrl"
          rounded
          width="44"
          :alt="data.name"
        ></b-img>
      </template>
      <h5 class="m-0 semibold font-color-black-87">
        {{ data.name }}
      </h5>
      <p class="mb-0 font-size-14">
        {{ data.location }}
      </p>
    </b-media>
  </div>
</template>

<script>
import api from '../../../api/api';

export default {
  name: 'CardMedia',
  props: {
    data: Object,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.data.image);
    },
  },
};
</script>
