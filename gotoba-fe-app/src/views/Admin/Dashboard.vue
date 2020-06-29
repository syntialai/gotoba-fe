<template>
  <div class="admin-dashboard">
    <div class="analytics-section bg-white p-3 my-2">
      <div class="card-group d-flex">
        <div class="card-container m-2"
          v-for="info of infor"
          :key="info.text"
        >
          <info-card :info="info" />
        </div>
      </div>
    </div>

    <div class="chart-section bg-white p-3 mb-2">
      <div class="d-flex flex-wrap">
        <bar-chart />
        <line-chart />
        <pie-chart />
      </div>
    </div>
  </div>
</template>

<script>
import InfoCard from '../../components/Admin/Card/InfoCard.vue';
import BarChart from '../../components/Admin/Chart/BarChart.vue';
import LineChart from '../../components/Admin/Chart/LineChart.vue';
import PieChart from '../../components/Admin/Chart/PieChart.vue';

export default {
  name: 'Dashboard',
  components: {
    InfoCard,
    BarChart,
    LineChart,
    PieChart,
  },
};
</script>
