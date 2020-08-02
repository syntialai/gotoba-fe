<template>
  <div class="pdf-modal" v-if="schedule">
    <b-modal
      id="export-pdf-modal"
      title="Export Pdf"
      title-class="font-size-20"
      centered
      size="sm"
      ok-title="EXPORT"
      @ok="getItinerary"
      cancel-title="CANCEL"
    >
      <b-form @submit.stop.prevent="getItinerary">
        <b-form-group
          id="begin-date-group"
          label="Begin Date"
          label-for="begin-date"
        >
          <b-form-datepicker
            id="begin-date"
            v-model="begin.date"
            :min="begin.min"
            :max="maxDate"
            required
            :date-format-options="{ year: 'numeric', month: 'long', day: 'numeric' }"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group
          id="end-date-group"
          label="End Date"
          label-for="end-date"
        >
          <b-form-datepicker
            id="end-date"
            v-model="end.date"
            :min="end.min"
            :max="maxDate"
            required
            :date-format-options="{ year: 'numeric', month: 'long', day: 'numeric' }"
          ></b-form-datepicker>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { mapGetters } from 'vuex';
import { formatDate, sortTime, sortDate } from '../../../utils/filter';

export default {
  name: 'PdfModal',
  computed: {
    ...mapGetters(['schedule']),
    maxDate() {
      const sched = this.sortedSchedule;
      if (sched.length > 0) {
        return new Date(sched[sched.length - 1].date);
      }
      return new Date();
    },
    sortedSchedule() {
      if (this.schedule.length > 0) {
        return sortDate(this.schedule);
      }
      return [];
    },
  },
  data() {
    return {
      begin: {
        date: '',
        min: new Date(),
      },
      end: {
        date: '',
        min: new Date(),
      },
    };
  },
  methods: {
    getItinerary() {
      if (this.begin.date === '' || this.end.date === '') {
        return;
      }

      if (new Date(this.begin.date) > new Date(this.end.date)) {
        this.exportPdf(this.end.date, this.begin.date);
        return;
      }

      this.exportPdf(this.begin.date, this.end.date);
    },
    exportPdf(begin, end) {
      /* eslint new-cap: ["error", { "newIsCapExceptions": ["jsPDF"] }] */
      const pdfName = `Itinerary - ${begin} - ${end}`;
      const doc = new jsPDF();
      doc.text(`Itinerary - ${begin} - ${end}`, 15, 30);
      doc.autoTableSetDefaults({
        headStyles: { fillColor: [4, 140, 232] },
      });

      doc.autoTable({
        head: [[]],
        body: [[]],
        startY: 0,
        margin: {
          top: 20,
          bottom: 20,
        },
      });

      // Table
      doc.setFontSize(12);

      const filteredSched = this.sortedSchedule.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(begin) && itemDate <= new Date(end);
      });

      filteredSched.forEach((itemSched) => {
        const sched = itemSched;
        sched.schedule = sortTime(sched.schedule);
        console.log(sched.date);
        doc.text(
          formatDate(new Date(sched.date)),
          15,
          typeof doc.autoTable.previous.finalY === 'undefined' || doc.autoTable.previous.finalY < 40
            ? 45 : doc.autoTable.previous.finalY + 10,
        );

        const schedArr = [];
        sched.schedule.forEach((item) => {
          schedArr.push([item.time, item.destination]);
          console.log(schedArr);
        });

        console.log(doc.autoTable.previous.finalY);

        doc.autoTable({
          head: [['Time', 'Destination']],
          body: schedArr,
          startY: doc.autoTable.previous.finalY === 0
            ? 50 : doc.autoTable.previous.finalY + 15,
          margin: {
            top: 10,
            bottom: 20,
          },
        });
      });

      // Footer
      doc.setTextColor('#999');
      doc.setFontSize(11);
      for (let i = 1; i <= doc.internal.getNumberOfPages(); i += 1) {
        doc.setPage(i);
        doc.text(
          '© goToba - 2020',
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 15,
          { align: 'center' },
        );
      }

      doc.save(`${pdfName}.pdf`);
    },
  },
};
</script>
