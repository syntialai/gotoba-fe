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
  },
  methods: {
    async getImage(url) {
      const res = await api.GetImage(url);
      return res.data;
    },
  },
};
</script>
