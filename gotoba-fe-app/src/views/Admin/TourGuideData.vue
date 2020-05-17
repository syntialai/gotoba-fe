<template>
  <div class="tour-guide-data">
    <div class="d-flex align-items-center justify-content-between">
      <show-data-count
        :perPage="perPage"
        class="my-3"
      />

      <b-button
        class="custom-btn-primary"
        v-b-modal.add-tour-guide-modal
      >ADD</b-button>
    </div>

    <tour-guide-modal />

    <tour-guide-card-group id="tour-guide-data-group" :tourGuides="tourGuides" />

    <div class="info">
      Showing {{ (currentPage - 1) * perPage + 1 }} to
      {{ currentPage * perPage }} of
      50 entries
      <!-- {{ users.length }} entries -->
    </div>

    <pagination
      :currentPage="currentPage"
      :perPage="perPage"
      class="my-3"
      idControls="tour-guide-data-group"
    />
  </div>
</template>

<script>
import TourGuideModal from '../../components/Admin/Modal/TourGuideModal.vue';
import TourGuideCardGroup from '../../components/Admin/Data/TourGuideCardGroup.vue';
import Pagination from '../../components/Partial/Pagination.vue';
import ShowDataCount from '../../components/Admin/Data/ShowDataCount.vue';

export default {
  name: 'TourGuideData',
  components: {
    TourGuideModal,
    TourGuideCardGroup,
    Pagination,
    ShowDataCount,
  },
  data() {
    return {
      tourGuides: [],
    };
  },
};
</script>
