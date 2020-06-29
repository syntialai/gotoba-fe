<template>
  <div class="gallery px-3">
    <div class="title mb-1 pt-3 d-flex align-items-center">
      <font-awesome-icon
          :icon="['far', 'images']"
          class="icon-gradient font-size-24 pr-2"
        />
      <h6 class="font-color-blue-primary m-0">Our Gallery</h6>
    </div>

    <div class="info font-color-black-60 font-size-14 mb-3">
      Show every moment captured around Lake Toba
    </div>

    <gallery-group :data="galleryData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GalleryGroup from '../../../components/User/Home/GalleryGroup.vue';

export default {
  name: 'Gallery',
  components: {
    GalleryGroup,
  },
  computed: {
    ...mapGetters(['galleryData']),
  },
  created() {
    this.getGalleryData();
  },
  methods: {
    ...mapActions(['getGalleryData']),
  },
};
</script>
