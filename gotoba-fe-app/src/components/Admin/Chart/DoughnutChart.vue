<script>
import { Doughnut, mixins } from 'vue-chartjs';

export default {
  extends: Doughnut,
  name: 'DoughnutChart',
  data() {
    return {
      options: {
        legend: {
          display: true,
          position: 'bottom',
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
    renderDoughnutChart() {
      this.renderChart(this.computedData, this.options);
    },
  },
  mounted() {
    this.renderDoughnutChart();
  },
};
</script>
