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
    />

    <itinerary-card
      v-if="journeyDataBySku"
      :itinerary="journeyDataBySku"
    />

    <div
      v-if="journeyDataBySku.sku"
      class="more-itinerary-info bg-white p-3"
    >
      <div class="full-address d-flex justify-content-between py-2">
        <div class="full-address-label font-color-black-60">
          Full Address
        </div>
        <div class="full-address-value font-color-black-87 semibold pl-4">
          {{ journeyDataBySku.address }}
        </div>
      </div>

      <div class="hours-open d-flex justify-content-between pt-1">
        <div class="hours-open-label font-color-black-60">
          Hours Open
        </div>
        <div class="hours-open-value font-color-black-87 semibold pl-4 white-space-pre">
          {{ hoursOpen }}
        </div>
      </div>

      <div class="phone-number d-flex justify-content-between">
        <div class="phone-number-label font-color-black-60">
          Created by
        </div>
        <div class="phone-number-value font-color-black-87 semibold pl-4">
          {{ journeyDataBySku.createdBy }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { toCapitalize } from '../../utils/filter';
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
          hoursOpenStr += `${toCapitalize(key)}\t = ${value[0]} - ${value[1]}\n`;
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
      this.removeItinerary(this.journeyDataBySku.sku);
      this.$router.push('/admin/itinerary');
    },
    confirmModal() {
      this.$bvModal.msgBoxConfirm('Itinerary will be removed permanently from this system.', {
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
        .then((value) => {
          if (value) {
            this.deleteItinerary();
          }
        })
        .catch(
          (err) => console.log(err),
        );
    },
  },
};
</script>


<style lang="scss">
.white-space-pre {
  white-space: pre-wrap;
}
</style>
