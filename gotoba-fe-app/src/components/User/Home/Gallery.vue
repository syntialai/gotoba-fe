<template>
  <div class="gallery-group">
    <div class="title mb-3">
      <font-awesome-icon :icon="['far', 'images']" class="icon icon-gradient" />
      <h4 class="font-color-blue-primary">Our Gallery</h4>
    </div>
    
    <VueGallery :images="images" :index="index" @close="index = null" />
    <div
      class="image"
      v-for="(image, imageIndex) in images"
      :key="imageIndex"
      @click="index = imageIndex"
      :style="{ backgroundImage: 'url(' + image + ')', width: '300px', height: '200px' }"
    ></div>
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
        'https://dummyimage.com/800/ffffff/000000',
        'https://dummyimage.com/1600/ffffff/000000',
        'https://dummyimage.com/1280/000000/ffffff',
        'https://dummyimage.com/400/000000/ffffff',
      ],
      index: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
}
</style>