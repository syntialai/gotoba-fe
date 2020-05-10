<template>
  <div class="gallery-data">
    <b-card-group deck>
      <gallery-card
        v-for="photo of photos"
        :key="photo.title"
        :image="photo.image"
        :info="photo.title"
      />
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
  },
};
</script>
