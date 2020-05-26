<template>
  <div class="spot">
    <card-info class="p-4" :info="cardInfo" />

    <div class="p-4">
      <b-button
        block
        class="custom-btn-primary border-none"
        v-b-modal.add-itinerary-modal
      >
        ADD NEW SPOT
      </b-button>
    </div>

    <itinerary-modal />

    <spot-card-group v-bind="itineraries" />
  </div>
</template>

<script>
import CardInfo from '../../../components/Merchant/Card/CardInfo.vue';
import ItineraryModal from '../../../components/Admin/Modal/ItineraryModal.vue';
import SpotCardGroup from '../../../components/Merchant/Data/SpotCardGroup.vue';

export default {
  name: 'Spot',
  components: {
    CardInfo,
    ItineraryModal,
    SpotCardGroup,
  },
  computed: {
    cardInfo() {
      return {
        value1: 3,
        info1: 'Spots Active',
        value2: 5,
        info2: 'Recent Reviews',
      };
    },
    itineraries() {
      return [];
    },
  },
};
</script>
