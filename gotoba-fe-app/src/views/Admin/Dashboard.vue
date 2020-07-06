<template>
  <div class="admin-dashboard">
    <div class="analytics-section bg-white p-3 my-2">
      <div class="card-group d-flex flex-wrap justify-content-around">
        <div class="card-container m-2"
          v-for="info of infos"
          :key="info.text"
        >
          <info-card :info="info" />
        </div>
      </div>
    </div>

    <div class="chart-section bg-white p-3 mb-2">
      <div class="d-flex flex-wrap justify-content-around">
        <line-chart
          :chartData="lineChartData"
          :width="getSize"
          :height="getSize"
          class="my-3"
        />
        <doughnut-chart
          :chartData="doughnutChartData"
          :width="getSize"
          :height="getSize"
          class="my-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InfoCard from '../../components/Admin/Card/InfoCard.vue';
import LineChart from '../../components/Admin/Chart/LineChart.vue';
import DoughnutChart from '../../components/Admin/Chart/DoughnutChart.vue';

export default {
  name: 'Dashboard',
  components: {
    InfoCard,
    LineChart,
    DoughnutChart,
  },
  computed: {
    getSize() {
      const windowWidth = window.innerWidth;
      const size = windowWidth - 64 - 100 - 40;

      return windowWidth >= 768 ? size / 2 : size + 72;
    },
  },
  data() {
    return {
      lineChartData: {
        labels: [
          'Babol',
          'Cabanatuan',
          'Daegu',
          'Jerusalem',
        ],
        datasets: [
          {
            label: 'Line Chart',
            data: [600, 50, 342, 6050],
            fill: false,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            borderWidth: 2,
          },
        ],
      },
      doughnutChartData: {
        labels: ['Babol', 'Cabanatuan'],
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            data: [100, 500],
          },
        ],
      },
      infos: [
        {
          title: '100',
          text: 'Journey ticket sold',
          icon: 'route',
          colorNo: 0,
        },
        {
          title: '300',
          text: 'Restaurant ticket sold',
          icon: 'utensils',
          colorNo: 1,
        },
        {
          title: '500',
          text: 'Hotel ticket sold',
          icon: 'hotel',
          colorNo: 2,
        },
      ],
    };
  },
};
</script>
