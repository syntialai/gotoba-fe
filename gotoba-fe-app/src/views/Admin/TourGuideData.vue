<template>
  <div class="tour-guide-data">
    <div class="d-flex align-items-center justify-content-between">
      <show-data-count
        :perPage.sync="perPage"
        class="my-3"
      />

      <b-button
        class="custom-btn-primary"
        v-b-modal.add-tour-guide-modal
      >ADD</b-button>
    </div>

    <tour-guide-modal title="Add" />

    <tour-guide-card-group
      id="tour-guide-data-group"
      v-if="tourGuideDatas"
      :start="dataStart"
      :end="dataEnd"
      :tourGuideDatas="tourGuideDatas"
    />

    <div class="info" v-if="tourGuideDatas">
      Showing {{ dataStart }} to {{ dataEnd }} of {{ tourGuideDatas.length }} entries
    </div>

    <pagination
      v-if="tourGuideDatas"
      :currentPage.sync="currentPage"
      :perPage="perPage"
      :rows="tourGuideDatas.length"
      class="my-3"
      idControls="tour-guide-data-group"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['tourGuideDatas']),

    dataStart() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    dataEnd() {
      const end = this.currentPage * this.perPage;

      if (end > this.tourGuideDatas.length) {
        return this.tourGuideDatas.length;
      }

      return end;
    },
  },
  created() {
    this.getTourGuideData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  methods: {
    ...mapActions(['getTourGuideData']),
  },
};
</script>
