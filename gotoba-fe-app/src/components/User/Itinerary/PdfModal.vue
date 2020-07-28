<template>
  <div class="pdf-modal">
    <b-modal
      id="export-pdf-modal"
      title="Export Pdf"
      title-class="font-size-20"
      centered
      size="sm"
      ok-title="EXPORT"
      @ok="exportPdf"
      cancel-title="CANCEL"
    >
      <b-form @submit.stop.prevent="exportPdf">
        <b-form-group
          id="begin-date-group"
          label="Begin Date"
          label-for="begin-date"
        >
          <b-form-datepicker
            id="begin-date"
            v-model="begin.date"
            :min="begin.min"
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

export default {
  name: 'PdfModal',
  computed: {
    ...mapGetters(['schedule']),
  },
  data() {
    return {
      begin: {
        date: '',
        min: new Date(),
        max: '',
      },
      end: {
        date: '',
        min: new Date(),
        max: '',
      },
    };
  },
  methods: {
    getItinerary() {},
    exportPdf() {
      /* eslint new-cap: ["error", { "newIsCapExceptions": ["jsPDF"] }] */
      const pdfName = `Itinerary - ${this.begin.date} - ${this.end.date}`;
      const doc = new jsPDF();
      doc.text(`Itinerary - ${this.begin.date} - ${this.end.date}`, 15, 30);
      doc.autoTableSetDefaults({
        headStyles: { fillColor: [4, 140, 232] },
      });

      // Table
      doc.setFontSize(12);
      doc.text('Caption', 15, 40);
      doc.autoTable.previous.finalY = 30;

      let date = new Date(this.begin.date);
      while (date < this.end.date) {
        doc.text('Caption', 15, doc.autoTable.previous.finalY + 10);

        doc.autoTable({
          head: [['ID', 'Name', 'Email', 'Country', 'IP-address']],
          body: [
            ['1', 'Donna', 'dmoore0@furl.net', 'China', '211.56.242.221'],
            ['2', 'Janice', 'jhenry1@theatlantic.com', 'Ukraine', '38.36.7.199'],
            [
              '3',
              'Ruth',
              'rwells2@constantcontact.com',
              'Trinidad and Tobago',
              '19.162.133.184',
            ],
            ['4', 'Jason', 'jray3@psu.edu', 'Brazil', '10.68.11.42'],
            ['5', 'Jane', 'jstephens4@go.com', 'United States', '47.32.129.71'],
            ['6', 'Adam', 'anichols5@com.com', 'Canada', '18.186.38.37'],
          ],
          startY: doc.autoTable.previous.finalY + 15,
          margin: {
            bottom: 20,
          },
        });

        date = new Date(date.setDate(date.getDate() + 1));
      }

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
