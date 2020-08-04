<template>
  <div class="gallery-card box-shadow">
    <router-link :to="goToAdminGallery">
      <b-card
        :img-src="imageUrl"
        :img-alt="info"
        img-top
        img-height="120"
        class="p-0 my-2"
      >
        <b-card-text class="align-center semibold p-2">
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
    goToAdminGallery() {
      return `/admin/gallery/${this.sku}`;
    },
  },
};
</script>
