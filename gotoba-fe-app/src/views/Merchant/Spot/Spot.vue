<template>
  <div class="spot" v-if="itineraries">
    <card-info
      class="p-4"
      :info="cardInfo"
    />

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

    <spot-card-group :itineraries="itineraries" v-if="itineraries" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
    ...mapGetters([
      'journeyDataByMerchantSku',
      'merchantItineraryOrder',
      'userSku',
    ]),
    cardInfo() {
      return {
        value1: this.itineraries.length,
        info1: 'Spots Active',
        value2: this.merchantItineraryOrder.length,
        info2: 'Recent Orders',
      };
    },
    itineraries() {
      return this.journeyDataByMerchantSku;
    },
  },
  created() {
    this.getJourneyDataByMerchantSku(this.userSku);
    this.getMerchantItineraryOrder(this.userSku);
  },
  methods: {
    ...mapActions([
      'getJourneyDataByMerchantSku',
      'getMerchantItineraryOrder',
    ]),
  },
};
</script>
