<template>
  <div class="itinerary p-3">
    <this-week-calendar class="mb-3" />

    <itinerary-plan class="box-shadow" />

    <div class="button-group mt-5 d-flex justify-content-around">
      <b-button
        pill
        @click="generatePdf"
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ItineraryPlan from '../../../components/User/Itinerary/ItineraryPlan.vue';
import ThisWeekCalendar from '../../../components/User/Itinerary/ThisWeekCalendar.vue';

export default {
  name: 'Itinerary',
  components: {
    ItineraryPlan,
    ThisWeekCalendar,
  },
  methods: {
    addItinerary() {
      this.$router.push('/itinerary/add');
    },
    generatePdf() {
    /* eslint new-cap: ["error", { "newIsCapExceptions": ["jsPDF"] }] */
      const pdfName = `Itinerary - ${new Date().toDateString()}`;
      const doc = new jsPDF();
      doc.text('Hello', 15, 15);
      doc.autoTable();
      doc.save(`${pdfName}.pdf`);
    },
  },
};
</script>
