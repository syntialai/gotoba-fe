<template>
  <div class="itinerary p-3 vh-100">
    <this-week-calendar class="mb-3" />

    <itinerary-plan class="box-shadow"/>

    <pdf-modal />

    <div class="button-group mt-5 d-flex justify-content-around">
      <b-button
        pill
        v-b-modal.export-pdf-modal
        class="custom-btn-blue-secondary p-1"
      >
        <font-awesome-icon icon="print" class="font-size-24 m-3" />
      </b-button>
      <b-button
        pill
        @click="addItinerary"
        class="custom-btn-blue-primary p-1"
      >
        <font-awesome-icon icon="plus" class="font-size-24 m-3" />
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ItineraryPlan from '../../../components/User/Itinerary/ItineraryPlan.vue';
import PdfModal from '../../../components/User/Itinerary/PdfModal.vue';
import ThisWeekCalendar from '../../../components/User/Itinerary/ThisWeekCalendar.vue';

export default {
  name: 'Itinerary',
  components: {
    ItineraryPlan,
    PdfModal,
    ThisWeekCalendar,
  },
  computed: {
    ...mapGetters(['schedule', 'userSku']),
  },
  created() {
    this.getSchedule(this.userSku);
  },
  methods: {
    ...mapActions(['getSchedule']),
    addItinerary() {
      this.$router.push('/itinerary/add');
    },
  },
};
</script>
