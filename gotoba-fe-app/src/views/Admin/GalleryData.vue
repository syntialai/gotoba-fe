<template>
  <div class="gallery-data">
    <div class="d-flex align-items-center justify-content-between">
      <show-data-count
        :perPage.sync="perPage"
        class="my-3"
      />

      <b-button
        class="custom-btn-primary"
        v-b-modal.add-photo-modal
      >ADD</b-button>
    </div>

    <photo-modal />

    <gallery-card-group
      id="gallery-data-group"
      :photos="galleryData"
    />

    <div class="info">
      Showing {{ dataStart }} to {{ dataEnd }} of {{ galleryData.length }} entries
      <!-- {{ users.length }} entries -->
    </div>

    <pagination
      :currentPage.sync="currentPage"
      :perPage.sync="perPage"
      class="my-3"
      idControls="gallery-data-group"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PhotoModal from '../../components/Admin/Modal/PhotoModal.vue';
import GalleryCardGroup from '../../components/Admin/Data/GalleryCardGroup.vue';
import Pagination from '../../components/Partial/Pagination.vue';
import ShowDataCount from '../../components/Admin/Data/ShowDataCount.vue';

export default {
  name: 'GalleryData',
  components: {
    PhotoModal,
    GalleryCardGroup,
    Pagination,
    ShowDataCount,
  },
  computed: {
    ...mapGetters(['galleryData']),

    dataStart() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    dataEnd() {
      return this.currentPage * this.perPage;
    },
  },
  created() {
    this.getGalleryData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  methods: {
    ...mapActions(['getGalleryData']),
  },
};
</script>
