<script>
import { Line, mixins } from 'vue-chartjs';

export default {
  extends: Line,
  name: 'LineChart',
  data() {
    return {
      options: {
        layout: {
          padding: 16,
        },
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true },
            gridlines: { display: true },
          }],
          xAxes: [{
            gridlines: { display: false },
          }],
        },
        legend: {
          display: true,
        },
        maintainAspectRatio: false,
      },
    };
  },
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    computedData() {
      return this.chartData;
    },
  },
  methods: {
    renderLineChart() {
      this.renderChart(this.computedData, this.options);
    },
  },
  mounted() {
    this.renderLineChart();
  },
};
</script>
