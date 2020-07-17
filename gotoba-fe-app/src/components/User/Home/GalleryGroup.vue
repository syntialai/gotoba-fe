<template>
  <div class="gallery-group m-3">
    <vue-gallery :images="images" :index="index" @close="index = null" />

    <div class="image-group d-flex justify-content-between flex-wrap">
      <div
        class="responsive-image"
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
      >
        <div
          class="image box-shadow m-1 border-square-10"
          @click="index = imageIndex"
        >
          <img
            :src="image"
            :alt="imageIndex"
            class="w-100 border-square-10"
            :height="getHeight"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
  name: 'GalleryGroup',
  components: {
    VueGallery,
  },
  computed: {
    getHeight() {
      const width = window.innerWidth - 32;
      const margin = 8;

      if (width >= 768 - 32) {
        return (width - margin * 4) / 5;
      }
      if (width >= 425 - 32) {
        return (width - margin * 3) / 4;
      }
      return (width - margin * 2) / 3;
    },
    images() {
      return this.galleryData.map((data) => data.image);
    },
  },
  data() {
    return {
      index: null,
    };
  },
  props: {
    galleryData: Array,
  },
};
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
  object-position: 50% 50%;
}

.responsive-image {
  box-sizing: border-box;
  width: 33.33333%;
}

@media screen and (min-width: 425px) {
  .responsive-image {
    width: 25%;
  }
}

@media screen and (min-width: 768px) {
  .responsive-image {
    width: 20%;
  }
}
</style>
