<template>
  <div class="gallery-data">
    <b-card-group class="d-flex flex-wrap">
      <div class="responsive-card-admin"
        v-for="photo of photos"
        :key="photo.title"
      >
        <gallery-card
          :image="photo.image"
          :info="photo.title"
          :sku="photo.sku"
        />
      </div>
    </b-card-group>
  </div>
</template>

<script>
import GalleryCard from '../Card/GalleryCard.vue';

export default {
  name: 'GalleryCardGroup',
  components: {
    GalleryCard,
  },
  props: {
    photos: Array,
    start: Number,
    end: Number,
  },
  computed: {
    galleryRange() {
      return this.photos.slice(this.start - 1, this.end);
    },
  },
};
</script>
