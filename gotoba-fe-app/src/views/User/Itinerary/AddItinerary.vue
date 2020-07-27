<template>
  <div class="add-itinerary">
    <choose-date-calendar />

    <timeline
      v-if="locationData"
      :timelines="timelines"
      :add="true"
    />

    <div class="w-100 d-flex box-shadow fixed-bottom">
      <div class="w-50">
        <b-button
          block
          squared
          class="bg-white font-color-blue-primary p-3 border-none"
          @click="goBack"
        >CANCEL</b-button>
      </div>
      <div class="w-50">
        <b-button
          block
          squared
          class="custom-btn-primary p-3 border-none"
          @click="submitTravellingSchedule"
        >ADD</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ChooseDateCalendar from '../../../components/User/Itinerary/ChooseDateCalendar.vue';
import Timeline from '../../../components/Partial/Timeline.vue';
import api from '../../../api/api';

export default {
  name: 'AddItinerary',
  components: {
    ChooseDateCalendar,
    Timeline,
  },
  computed: {
    ...mapGetters([
      'locationData',
      'userSku',
      'newSchedule',
      'selectedDate',
      'schedule',
    ]),
  },
  created() {
    this.getLocationData();
    console.log(this.locationData);
  },
  data() {
    return {
      timelines: [],
    };
  },
  methods: {
    ...mapActions([
      'getLocationData',
      'setLocationKeyword',
      'clearNewSchedule',
    ]),
    submitTravellingSchedule() {
      try {
        this.newSchedule.forEach(async (schedule) => {
          const index = this.schedule.findIndex((item) => item.date === schedule.date);
          if (index === -1) {
            await api.PostTravellingSchedule(this.userSku, schedule);
          } else {
            await api.EditTravellingSchedule(this.schedule[index].sku, schedule);
          }
        });
        this.$router.push('/itinerary');
        this.setDefault();
      } catch (err) {
        console.log(err);
      }
    },
    setDefault() {
      this.setLocationKeyword('');
      this.clearNewSchedule();
    },
    goBack() {
      this.$router.go(-1);
      this.setDefault();
    },
  },
};
</script>
