<template>
  <div class="itinerary-detail">
    <div class="d-flex justify-content-between">
      <b-button
        class="custom-btn-red"
        @click="deleteItinerary"
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
import { mapActions } from 'vuex';
import ItineraryModal from '../../components/Admin/Modal/ItineraryModal.vue';
import { confirmModal } from '../../utils/tool';

export default {
  name: 'ItineraryDetail',
  components: {
    ItineraryModal,
  },
  data() {
    return {
      itinerary: {},
    };
  },
  methods: {
    ...mapActions.removeItinerary,
    deleteItinerary() {
      const confirmModalValue = confirmModal(this.itinerary.title);

      if (confirmModalValue) {
        this.removeItinerary(this.itinerary.sku);
      }
    },
  },
};
</script>
