<template>
  <div class="card-description-detail">
    <b-card class="w-100" no-body>
      <b-aspect aspect="16:9">
        <b-card-img
          v-if="image"
          :src="imageUrl"
          :alt="'Image-' + title"
          class="w-100"
          top
        ></b-card-img>
      </b-aspect>
      <b-card-title>
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
