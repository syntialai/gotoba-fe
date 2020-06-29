<script>
import { Bar } from 'vue-chartjs';

export default {
  name: 'BarChart',
  components: {
    Bar,
  },
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
