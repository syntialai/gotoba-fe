<template>
  <div class="itinerary-detail">
    <div class="d-flex justify-content-between">
      <b-button
        class="custom-btn-red"
        @click="confirmModal(itinerary.title)"
      >DELETE</b-button>
      <b-button
        v-b-modal.add-itinerary-modal
        class="custom-btn-primary"
      >EDIT</b-button>
    </div>

    <itinerary-modal title="Edit" :itinerary="itinerary" />

    <div class="itinerary-detail">
      <img :src="itinerary.image" :alt="itinerary.title">

      <h2 class="mt-3">{{ itinerary.title }}</h2>

      <p>{{ itinerary.description }}</p>
    </div>
  </div>
</template>

<script>
import ItineraryModal from '../../components/Admin/Modal/ItineraryModal.vue';
import confirmModal from '../../utils/tool';

import { mapActions } from 'vuex';

export default {
  name: 'ItineraryDetail',
  components: {
    ItineraryModal,
  },
  methods: {
    ...mapActions(['removeItinerary']),
    deleteItinerary(object) {
      const confirmModalValue = confirmModal(object);

      if (confirmModalValue) {
        this.removeItinerary();
      }
    },
  },
};
</script>
