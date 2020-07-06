<template>
  <div class="add-itinerary">
    <choose-date-calendar />

    <timeline :timelines="timelines" />

    <select-destination-autocomplete :showAutocomplete="showAutocomplete" />

    <div class="w-100 d-flex box-shadow fixed-bottom">
      <div class="w-50">
        <b-button
          block
          squared
          class="bg-white font-color-blue-primary p-3"
          @click="goBack"
        >CANCEL</b-button>
      </div>
      <div class="w-50">
        <b-button
          block
          squared
          class="custom-btn-primary p-3"
          @click="submitTravellingSchedule"
        >ADD</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import ChooseDateCalendar from '../../../components/User/Itinerary/ChooseDateCalendar.vue';
import SelectDestinationAutocomplete from '../../../components/User/Itinerary/SelectDestinationAutocomplete.vue';
import Timeline from '../../../components/Partial/Timeline.vue';
import api from '../../../api/api';

export default {
  name: 'AddItinerary',
  components: {
    ChooseDateCalendar,
    SelectDestinationAutocomplete,
    Timeline,
  },
  data() {
    return {
      timelines: [],
      showAutocomplete: false,
    };
  },
  methods: {
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
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
