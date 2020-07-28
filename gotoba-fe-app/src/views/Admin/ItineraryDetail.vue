<template>
  <div class="itinerary-detail" v-if="journeyDataBySku">
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

    <itinerary-modal
      title="Edit"
      :itinerary="journeyDataBySku"
    />

    <itinerary-card
      v-if="journeyDataBySku"
      :itinerary="journeyDataBySku"
    />

    <div
      v-if="journeyDataBySku"
      class="more-itinerary-info"
    >
      <div class="full-address d-flex justify-content-between">
        <div class="full-address-label font-color-black-60">
          Full Address
        </div>
        <div class="full-address-value font-color-black-87 semibold pl-4">
          {{ journeyDataBySku.address }}
        </div>
      </div>

      <div class="hours-open d-flex justify-content-between">
        <div class="hours-open-label font-color-black-60">
          Hours
        </div>
        <div class="hours-open-value font-color-black-87 semibold pl-4">
          {{ hoursOpen }}
        </div>
      </div>

      <div class="phone-number d-flex justify-content-between">
        <div class="phone-number-label font-color-black-60">
          Phone Number
        </div>
        <div class="phone-number-value font-color-black-87 semibold pl-4">
          {{ journeyDataBySku.phone }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ItineraryCard from '../../components/Admin/Card/ItineraryCard.vue';
import ItineraryModal from '../../components/Admin/Modal/ItineraryModal.vue';

export default {
  name: 'ItineraryDetail',
  components: {
    ItineraryCard,
    ItineraryModal,
  },
  computed: {
    ...mapGetters(['journeyDataBySku']),
    hoursOpen() {
      let hoursOpenStr = '';

      Object.entries(this.journeyDataBySku.hoursOpen)
        .forEach(([key, value]) => {
          hoursOpenStr += `${key} = ${value[0]} - ${value[1]}\n`;
        });

      return hoursOpenStr;
    },
  },
  created() {
    this.getJourneyDataBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getJourneyDataBySku', 'removeItinerary']),
    deleteItinerary() {
      const confirmModalValue = this.confirmModal(this.journeyDataBySku.title);

      if (confirmModalValue) {
        this.removeItinerary(this.journeyDataBySku.sku);
        this.$router.push('/admin/itinerary');
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
