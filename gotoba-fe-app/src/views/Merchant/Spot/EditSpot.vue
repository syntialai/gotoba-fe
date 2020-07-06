<template>
  <div class="edit-spot">
    <b-form @submit="updateBistro">
      <b-form-group>
        <b-img></b-img>
        <b-form-file
          v-model="journeyData.image"
          :state="Boolean(journeyData.image)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>

      <b-form-group
        id="spot-name-group"
        label="Bistro Name"
        label-for="spot-name"
      >
        <b-form-input
          id="spot-name"
          v-model="journeyData.name"
          type="text"
          class="border-gray"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="spot-location-group"
        label="Location"
        label-for="spot-location"
      >
        <b-form-input
          id="spot-location"
          v-model="journeyData.location"
          type="text"
          class="border-gray"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="spot-type-group"
        label="Bistro Type"
        label-for="spot-type"
      >
        <b-form-select
          v-model="journeyData.spotType"
          :options="spotTypeOptions"
          class="border-gray"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="spot-phone-number-group"
        label="Phone Number"
        label-for="spot-phone-number"
      >
        <b-form-input
          id="spot-phone-number"
          v-model="journeyData.phone"
          type="text"
          class="border-gray"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="spot-full-address-group"
        label="Full Address"
        label-for="spot-full-address"
      >
        <b-form-input
          id="spot-full-address"
          v-model="journeyData.address"
          type="text"
          class="border-gray"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="spot-hours-open-group"
        label="Hours Open"
        label-for="spot-hours-open"
      >
        <ul class="list-unstyled">
          <li
            v-for="(dayOpen, index) of journeyData.hoursOpen"
            :key="dayOpen.day"
          >
            <b-form-checkbox v-model="journeyData.hoursOpen[index].open">
              <div class="d-flex justify-content-between">
                <div class="day">{{ dayOpen.day }}</div>
                <div class="time">
                  <b-form-timepicker
                    v-model="journeyData.hoursOpen[index].openTime"
                    locale="en"
                  ></b-form-timepicker>
                  -
                  <b-form-timepicker
                    v-model="journeyData.hoursOpen[index].closeTime"
                    locale="en"
                  ></b-form-timepicker>
                </div>
              </div>
            </b-form-checkbox>
          </li>
        </ul>
      </b-form-group>

      <b-button block type="submit" class="custom-btn-primary" />
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import api from '../../../api/api';

export default {
  name: 'EditSpot',
  computed: {
    ...mapGetters(['journeyData']),
    ...mapState(['journeyData']),
  },
  created() {
    this.getJourneyDataBySku(this.$route.params.sku);
  },
  data() {
    return {
      spot: {
        name: '',
        image: null,
        location: '',
        spotType: '',
        phone: '',
        address: '',
        hoursOpen: [
          {
            open: true,
            day: '',
            openTime: '',
            closeTime: '',
          },
        ],
      },
      spotTypeOptions: ['A', 'B'],
    };
  },
  methods: {
    ...mapActions(['getJourneyDataBySku']),
    updateBistro() {
      const data = this.journeyData;

      if (data.sku) {
        api.EditItinerary(data.sku, data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      api.PostItinerary(data)
        .then((res) => {
          console.log(res);
          this.$route.push('/merchant/spot');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
