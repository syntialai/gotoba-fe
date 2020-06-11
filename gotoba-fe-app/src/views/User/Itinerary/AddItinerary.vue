<template>
  <div class="add-itinerary">
    <choose-date-calendar />

    <timeline :timelines="timelines" />

    <div class="w-100 d-flex fixed-bottom" style="height: 64px;">
      <div class="w-50">
        <b-button
          block
          class="bg-white font-color-blue-primary"
          @click="this.$router.go(-1)"
        >CANCEL</b-button>
      </div>
      <div class="w-50">
        <b-button
          block
          class="custom-btn-primary"
          @click="submitTravellingSchedule"
        >ADD</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import ChooseDateCalendar from '../../../components/User/Itinerary/ChooseDateCalendar.vue';
import Timeline from '../../../components/Partial/Timeline.vue';
import api from '../../../api/api';

export default {
  name: 'AddItinerary',
  components: {
    ChooseDateCalendar,
    Timeline,
  },
  data() {
    return {
      timelines: [],
    };
  },
  method: {
    submitTravellingSchedule() {
      const data = {};

      api.PostTravellingSchedule(this.data.sku, data)
        .then((res) => {
          console.log(res);
          this.$router.push('/itinerary');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
