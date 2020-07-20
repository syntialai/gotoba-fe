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
    ...mapGetters(['locationData', 'userSku', 'newSchedule']),
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
    ...mapActions(['getLocationData', 'setLocationKeyword', 'setNewSchedule']),
    submitTravellingSchedule() {
      const data = {
        title: this.newSchedule.destination.substr(
          0,
          this.newSchedule.destination.indexOf(','),
        ),
        description: this.newSchedule.destination,
        date: this.newSchedule.time,
        vacationDestination: this.newSchedule.destination,
      };

      api.PostTravellingSchedule(this.userSku, data)
        .then((res) => {
          console.log(res);
          this.setLocationKeyword('');
          this.setNewSchedule([]);
          this.$router.push('/itinerary');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.setLocationKeyword('');
      this.setNewSchedule([]);
      this.$router.go(-1);
    },
  },
};
</script>
