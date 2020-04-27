<template>
  <div class="gallery-group m-3">
    <div class="title mb-1 d-flex align-items-center">
      <font-awesome-icon
          :icon="['far', 'images']"
          class="icon-gradient font-size-24 pr-2"
        />
      <h6 class="font-color-blue-primary m-0">Our Gallery</h6>
    </div>

    <div class="info font-color-black-60 font-size-14 mb-3">
      Show every moment captured around Lake Toba
    </div>

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
  name: 'Gallery',
  components: {
    VueGallery,
  },
  data() {
    return {
      images: [
        'https://indonesiatatler.com/images/i/story-20160819151207-maritim.go.id_resized_773x457.jpg',
        'https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/revision-2019/all-revision-destination/sumatra/Lake_Toba.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'https://dummyimage.com/1280/000000/ffffff',
        'https://dummyimage.com/400/000000/ffffff',
      ],
      index: null,
    };
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
