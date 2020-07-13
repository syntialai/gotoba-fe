<template>
  <div class="gallery-detail">
    <div class="d-flex justify-content-between">
      <b-button
        class="custom-btn-red border-none"
        @click="deleteGalleryPhoto"
      >DELETE</b-button>
      <b-button
        v-b-modal.add-photo-modal
        class="custom-btn-primary border-none"
      >EDIT</b-button>
    </div>

    <photo-modal title="Edit" :photo="galleryPhoto" />

    <div class="photo-detail">
      <img :src="galleryPhoto.image" :alt="galleryPhoto.title">

      <h2 class="mt-3">{{ galleryPhoto.title }}</h2>

      <!-- <p>{{ galleryPhoto.description }}</p> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PhotoModal from '../../components/Admin/Modal/PhotoModal.vue';

export default {
  name: 'GalleryDetail',
  components: {
    PhotoModal,
  },
  computed: {
    ...mapGetters(['galleryPhoto']),
  },
  created() {
    this.getGalleryPhoto(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getGalleryPhoto', 'removeGalleryPhoto']),
    deleteGalleryPhoto() {
      const confirmModalValue = this.confirmModal(this.galleryPhoto.title);

      if (confirmModalValue) {
        this.removeGalleryPhoto(this.galleryPhoto.sku);
        this.$router.push('/admin/gallery');
      }
    },
    confirmModal(object) {
      this.$bvModal.msgBoxConfirm(`${object} will be removed permanently from this system.`, {
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
        .then((value) => value)
        .catch(
          (err) => console.log(err),
        );
    },
  },
};
</script>
