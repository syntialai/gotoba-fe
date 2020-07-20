<template>
  <div class="gallery-data">
    <b-card-group column>
      <gallery-card
        v-for="photo of photos"
        :key="photo.title"
        :image="getImage(photo.image)"
        :info="photo.title"
        :sku="photo.sku"
      />
    </b-card-group>
  </div>
</template>

<script>
import api from '../../../api/api';
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
  methods: {
    async getImage(url) {
      const res = await api.GetImage(url);
      return res.data;
    },
  },
};
</script>
