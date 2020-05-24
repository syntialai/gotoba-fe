<template>
  <div class="gallery-detail">
    <div class="d-flex justify-content-between">
      <b-button
        v-b-modal.confirm-modal
        class="custom-btn-red"
      >DELETE</b-button>
      <b-button
        v-b-modal.add-photo-modal
        class="custom-btn-primary"
      >EDIT</b-button>
    </div>

    <confirm-modal :object="photo.title" />
    <photo-modal title="Edit" :photo="photo" />

    <div class="photo-detail">
      <img :src="photo.image" :alt="photo.title">

      <h2 class="mt-3">{{ photo.title }}</h2>

      <p>{{ photo.description }}</p>
    </div>
  </div>
</template>

<script>
import ConfirmModal from '../../components/Partial/ConfirmModal.vue';
import PhotoModal from '../../components/Admin/Modal/PhotoModal.vue';

export default {
  name: 'GalleryDetail',
  components: {
    ConfirmModal,
    PhotoModal,
  },
  data() {
    return {
      photo: {},
    };
  },
};
</script>
