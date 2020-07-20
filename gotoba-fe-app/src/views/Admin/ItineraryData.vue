<template>
  <div class="itinerary-data">
    <div class="d-flex justify-content-between align-items-center">
      <show-data-count
        :perPage.sync="perPage"
        class="my-3"
      />

      <b-button
        class="custom-btn-primary"
        v-b-modal.add-itinerary-modal
      >ADD</b-button>
    </div>

    <itinerary-modal />

    <itinerary-card-group
      id="itinerary-data-group"
      v-if="journeyData"
      :itineraries="journeyData"
      :start="dataStart"
      :end="dataEnd"
    />

    <div class="info" v-if="journeyData">
      Showing {{ dataStart }} to {{ dataEnd }} of {{ journeyData.length }} entries
    </div>

    <pagination
      v-if="journeyData"
      :currentPage.sync="currentPage"
      :perPage="perPage"
      :rows="journeyData.length"
      class="my-3"
      idControls="itinerary-data-group"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ItineraryModal from '../../components/Admin/Modal/ItineraryModal.vue';
import ItineraryCardGroup from '../../components/Admin/Data/ItineraryCardGroup.vue';
import Pagination from '../../components/Partial/Pagination.vue';
import ShowDataCount from '../../components/Admin/Data/ShowDataCount.vue';

export default {
  name: 'ItineraryData',
  components: {
    ItineraryModal,
    ItineraryCardGroup,
    Pagination,
    ShowDataCount,
  },
  computed: {
    ...mapGetters(['journeyData']),
    dataStart() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    dataEnd() {
      const end = this.currentPage * this.perPage;

      if (end > this.journeyData.length) {
        return this.journeyData.length;
      }

      return end;
    },
  },
  created() {
    this.getJourneyData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  methods: {
    ...mapActions(['getJourneyData']),
  },
};
</script>
