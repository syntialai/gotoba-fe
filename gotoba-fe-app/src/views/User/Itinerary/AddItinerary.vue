<template>
  <div class="add-itinerary">
    <choose-date-calendar />

    <timeline
      v-if="locationData"
      :timelines="schedule"
      :add="true"
    />

    <div class="w-100 d-flex bg-white box-shadow fixed-bottom">
      <div class="w-50 p-2">
        <b-button
          block
          class="bg-white font-color-blue-primary p-3 border-square-10 box-shadow"
          @click="goBack"
        >CANCEL</b-button>
      </div>
      <div class="w-50 p-2">
        <b-button
          block
          squared
          class="custom-btn-primary p-3 border-square-10 box-shadow"
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
  },
  methods: {
    ...mapActions([
      'getLocationData',
      'setLocationKeyword',
      'clearNewSchedule',
      'setLocationOpen',
    ]),
    submitTravellingSchedule() {
      try {
        this.newSchedule.forEach(async (sched) => {
          const index = this.schedule.findIndex((item) => item.date === sched.date);
          if (index === -1) {
            await api.PostTravellingSchedule(this.userSku, {
              userSku: this.userSku,
              date: sched.date,
              schedule: sched.schedule,
            });
          } else {
            const editSched = sched;
            editSched.schedule.push(...this.schedule[index].schedule);

            await api.EditTravellingSchedule(this.schedule[index].sku, editSched);
          }
        });
        this.setDefault();
        this.$router.push('/itinerary');
      } catch (err) {
        console.log(err);
      }
    },
    setDefault() {
      this.setLocationKeyword('');
      this.setLocationOpen(true);
      this.clearNewSchedule();
    },
    goBack() {
      this.setDefault();
      this.$router.go(-1);
    },
  },
};
</script>
