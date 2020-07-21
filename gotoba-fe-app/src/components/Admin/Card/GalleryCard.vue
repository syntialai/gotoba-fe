<template>
  <div class="gallery-card box-shadow">
    <router-link :to="'/admin/gallery/' + sku">
      <b-card
        :img-src="imageUrl"
        :img-alt="info"
        img-top
        class="p-2 my-2"
      >
        <b-card-text class="align-center semibold">
          {{ info }}
        </b-card-text>
      </b-card>
    </router-link>
  </div>
</template>

<script>
import api from '../../../api/api';

export default {
  name: 'GalleryCard',
  props: {
    image: String,
    info: String,
    sku: String,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
  },
};
</script>
