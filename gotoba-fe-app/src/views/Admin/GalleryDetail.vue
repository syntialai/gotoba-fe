<template>
  <div class="gallery-detail">
    <div class="d-flex justify-content-between">
      <b-button
        class="custom-btn-red border-none"
        @click="confirmModal"
      >DELETE</b-button>
      <b-button
        v-b-modal.add-photo-modal
        class="custom-btn-primary border-none"
      >EDIT</b-button>
    </div>

    <photo-modal title="Edit" :photo="galleryPhoto" />

    <div class="photo-detail py-3">
      <img :src="imageUrl" :alt="galleryPhoto.title" class="w-100">

      <h2 class="mt-3">{{ galleryPhoto.title }}</h2>

      <p v-if="galleryPhoto.description && galleryPhoto.description !== ''">
        {{ galleryPhoto.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '../../api/api';
import PhotoModal from '../../components/Admin/Modal/PhotoModal.vue';

export default {
  name: 'GalleryDetail',
  components: {
    PhotoModal,
  },
  computed: {
    ...mapGetters(['galleryPhoto']),
    imageUrl() {
      return api.imageUrl(this.galleryPhoto.image);
    },
  },
  created() {
    this.getGalleryPhoto(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getGalleryPhoto', 'removeGalleryPhoto']),
    deleteGalleryPhoto() {
      this.removeGalleryPhoto(this.galleryPhoto.sku);
      this.$router.push('/admin/gallery');
    },
    confirmModal() {
      this.$bvModal.msgBoxConfirm('Photo will be removed permanently from this system.', {
        title: 'Are you sure?',
        size: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelVariant: 'outline-secondary',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
        .then((value) => {
          if (value) {
            this.deleteGalleryPhoto();
          }
        })
        .catch(
          (err) => console.log(err),
        );
    },
  },
};
</script>
