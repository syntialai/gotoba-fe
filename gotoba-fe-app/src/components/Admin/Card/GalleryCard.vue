<template>
  <div class="gallery-card box-shadow">
    <router-link :to="'/admin/gallery/' + sku">
      <b-card
        :img-src="image"
        :img-alt="info"
        img-top
        class="p-2"
      >
        <b-card-text class="align-center bold">
          {{ info }}
        </b-card-text>
      </b-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'GalleryCard',
  props: {
    image: String,
    info: String,
    sku: String,
  },
};
</script>
