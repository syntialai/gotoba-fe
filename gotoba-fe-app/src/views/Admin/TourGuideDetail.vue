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

    <tour-guide-card
      v-if="tourGuideData"
      :tourGuide="tourGuideData"
    />

    <div
      v-if="tourGuideData"
      class="more-tour-guide-info"
    >
      <div class="language d-flex justify-content-between">
        <div class="language-label font-color-black-60">
          Language
        </div>
        <div class="language-value font-color-black-87 semibold pl-4">
          {{ tourGuideData.language }}
        </div>
      </div>

      <div class="available-location d-flex justify-content-between">
        <div class="available-location-label font-color-black-60">
          Available location
        </div>
        <div class="available-location-value font-color-black-87 semibold pl-4">
          {{ tourGuideData.availableLocation }}
        </div>
      </div>

      <div class="phone-number d-flex justify-content-between">
        <div class="phone-number-label font-color-black-60">
          Phone Number
        </div>
        <div class="phone-number-value font-color-black-87 semibold pl-4">
          {{ tourGuideData.phoneNumber }}
        </div>
      </div>

      <div class="email d-flex justify-content-between">
        <div class="email-label font-color-black-60">
          Email
        </div>
        <div class="email-value font-color-black-87 semibold pl-4">
          {{ tourGuideData.email }}
        </div>
      </div>

      <div class="whatsapp-number d-flex justify-content-between">
        <div class="whatsapp-number-label font-color-black-60">
          Whatsapp
        </div>
        <div class="whatsapp-number-value font-color-black-87 semibold pl-4">
          {{ tourGuideData.whatsapp }}
        </div>
      </div>

      <div class="experience">
        <div class="experience-label font-color-black-60">
          Experience
        </div>
        <div class="experience-value font-color-black-87 semibold p-3">
          {{ tourGuideData.experience }}
        </div>
      </div>

      <div class="description">
        <div class="description-label font-color-black-60">
          Description
        </div>
        <div class="description-value font-color-black-87 semibold p-3">
          {{ tourGuideData.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  },
  created() {
    this.getTourGuideBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getTourGuideBySku', 'removeTourGuide']),
    deleteTourGuide() {
      const confirmModalValue = this.confirmModal(this.tourGuideData.name);

      if (confirmModalValue) {
        this.removeTourGuide(this.tourGuide.sku);
        this.$router.push('/admin/tour-guide');
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
