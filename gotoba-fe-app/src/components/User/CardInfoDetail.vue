<template>
  <div class="card-description-detail">
    <b-card class="w-100 p-3" no-body>
      <b-aspect aspect="16:9">
        <b-card-img
          v-if="image"
          :src="imageUrl"
          :alt="'Image-' + title"
          class="w-100"
          top
        ></b-card-img>
      </b-aspect>
      <b-card-title class="font-size-20 pt-3">
        {{ title }}
      </b-card-title>
      <b-card-text>
        {{ description }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import api from '../../api/api';

export default {
  name: 'CardInfoDetail',
  props: {
    title: String,
    image: String,
    description: String,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
  },
};
</script>

<style lang="scss">
.card-body {
  padding: 0 16px!important;
}
</style>
