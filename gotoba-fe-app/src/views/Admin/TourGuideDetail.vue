<template>
  <div class="tour-guide-detail">
    <div class="btn d-flex justify-content-between my-3">
      <b-button
        class="custom-btn-primary"
        v-b-modal.add-tour-guide-modal
      >EDIT</b-button>
      <b-button
        class="custom-btn-red"
        @click="deleteTourGuide"
      >DELETE</b-button>
    </div>

    <tour-guide-modal title="Edit" />

    <tour-guide-card :tourGuide="tourGuide" />

    <div class="more-tour-guide-info">
      <div class="language d-flex justify-content-between">
        <div class="language-label font-color-black-60">
          Language
        </div>
        <div class="language-value font-color-black-87 semibold pl-4">
          {{ tourGuide.language }}
        </div>
      </div>

      <div class="available-location d-flex justify-content-between">
        <div class="available-location-label font-color-black-60">
          Available location
        </div>
        <div class="available-location-value font-color-black-87 semibold pl-4">
          {{ tourGuide.availableLocation }}
        </div>
      </div>

      <div class="phone-number d-flex justify-content-between">
        <div class="phone-number-label font-color-black-60">
          Phone Number
        </div>
        <div class="phone-number-value font-color-black-87 semibold pl-4">
          {{ tourGuide.phoneNumber }}
        </div>
      </div>

      <div class="email d-flex justify-content-between">
        <div class="email-label font-color-black-60">
          Email
        </div>
        <div class="email-value font-color-black-87 semibold pl-4">
          {{ tourGuide.email }}
        </div>
      </div>

      <div class="whatsapp-number d-flex justify-content-between">
        <div class="whatsapp-number-label font-color-black-60">
          Whatsapp
        </div>
        <div class="whatsapp-number-value font-color-black-87 semibold pl-4">
          {{ tourGuide.whatsappNumber }}
        </div>
      </div>

      <div class="experience">
        <div class="experience-label font-color-black-60">
          Experience
        </div>
        <div class="experience-value font-color-black-87 semibold p-3">
          {{ tourGuide.experience }}
        </div>
      </div>

      <div class="description">
        <div class="description-label font-color-black-60">
          Description
        </div>
        <div class="description-value font-color-black-87 semibold p-3">
          {{ tourGuide.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { confirmModal } from '../../utils/tool';
import TourGuideCard from '../../components/Admin/Card/TourGuideCard.vue';
import TourGuideModal from '../../components/Admin/Modal/TourGuideModal.vue';

export default {
  name: 'TourGuideDetail',
  components: {
    TourGuideCard,
    TourGuideModal,
  },
  computed: {
    ...mapGetters(['tourGuideData']),
    tourGuide(sku) {
      return this.tourGuideData(sku);
    },
  },
  methods: {
    ...mapActions.removeTourGuide,
    deleteTourGuide() {
      const confirmModalValue = confirmModal(this.tourGuide.name);

      if (confirmModalValue) {
        this.removeTourGuide(this.tourGuide.sku);
        this.$router.go(-1);
      }
    },
  },
};
</script>
