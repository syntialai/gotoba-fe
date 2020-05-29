<template>
  <div class="gallery-detail">
    <div class="d-flex justify-content-between">
      <b-button
        class="custom-btn-red"
        @click="deleteGalleryPhoto"
      >DELETE</b-button>
      <b-button
        v-b-modal.add-photo-modal
        class="custom-btn-primary"
      >EDIT</b-button>
    </div>

    <photo-modal title="Edit" :photo="photo" />

    <div class="photo-detail">
      <img :src="photo.image" :alt="photo.title">

      <h2 class="mt-3">{{ photo.title }}</h2>

      <p>{{ photo.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import confirmModal from '../../utils/tool';
import PhotoModal from '../../components/Admin/Modal/PhotoModal.vue';

export default {
  name: 'GalleryDetail',
  components: {
    PhotoModal,
  },
  data() {
    return {
      photo: {},
    };
  },
  methods: {
    ...mapActions.removeGalleryPhoto,
    deleteGalleryPhoto() {
      const confirmModalValue = confirmModal(this.photo.title);

      if (confirmModalValue) {
        this.removeGalleryPhoto(this.photo.sku);
      }
    },
  },
};
</script>
