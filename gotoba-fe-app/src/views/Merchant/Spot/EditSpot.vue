<template>
  <div class="edit-spot mt-2 p-3">
    <ValidationObserver v-slot="validate">
      <b-form @submit.stop.prevent="validate(updateSpot)">
        <ValidationProvider
          name="Spot Image"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group>
            <div class="d-flex justify-content-center">
              <b-avatar
                :src="image"
                alt="Spot-profile"
                class="my-3"
                size="100"
              ></b-avatar>
            </div>
            <b-form-file
              v-model="image"
              @change="loadImage"
              :state="getValidationState(validationContext)"
              accept="image/jpeg, image/jpg, image/png"
              aria-describedby="edit-image-feedback-msg"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <b-form-invalid-feedback id="edit-image-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
            <b-button
              block
              v-if="image !== spot.image && image !== null"
              size="sm"
              class="custom-btn-gray mt-2"
              @click="removePhoto"
            >Remove photo</b-button>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          name="Spot name"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group
            id="spot-name-group"
            label="Spot Name"
            label-for="spot-name"
          >
            <b-form-input
              id="spot-name"
              v-model="spot.name"
              type="text"
              class="border-gray"
              required
              :state="getValidationState(validationContext)"
              aria-describedby="edit-spot-name-feedback-msg"
            ></b-form-input>
            <b-form-invalid-feedback id="edit-spot-name-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          name="Location"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group
            id="spot-location-group"
            label="Location"
            label-for="spot-location"
          >
            <b-form-input
              id="spot-location"
              v-model="spot.location"
              type="text"
              class="border-gray"
              required
              :state="getValidationState(validationContext)"
              aria-describedby="edit-location-feedback-msg"
            ></b-form-input>
            <b-form-invalid-feedback id="edit-location-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          name="Spot price"
          rules="required|numeric"
          v-slot="validationContext"
        >
          <b-form-group
            id="spot-price-group"
            label="Price"
            label-for="spot-price"
          >
            <b-form-input
              id="spot-price"
              v-model="spot.price"
              type="text"
              class="border-gray"
              required
              :state="getValidationState(validationContext)"
              aria-describedby="edit-price-feedback-msg"
            ></b-form-input>
            <b-form-invalid-feedback id="edit-price-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          name="Bistro phone number"
          :rules="{ numeric: true, min: 10, max: 13 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="spot-phone-number-group"
            label="Phone Number"
            label-for="spot-phone-number"
          >
            <b-form-input
              id="spot-phone-number"
              v-model="spot.phone"
              type="text"
              class="border-gray"
              required
              :state="getValidationState(validationContext)"
              aria-describedby="edit-phone-number-feedback-msg"
            ></b-form-input>
            <b-form-invalid-feedback id="edit-phone-number-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          name="Bistro address"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group
            id="spot-full-address-group"
            label="Full Address"
            label-for="spot-full-address"
          >
            <b-form-input
              id="spot-full-address"
              v-model="spot.address"
              type="text"
              class="border-gray"
              required
              :state="getValidationState(validationContext)"
              aria-describedby="edit-full-address-feedback-msg"
            ></b-form-input>
            <b-form-invalid-feedback id="edit-full-address-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <b-form-group
          id="spot-hours-open-group"
          label="Hours Open"
          label-for="spot-hours-open"
        >
          <ul class="list-unstyled">
            <li
              v-for="(dayOpen, index) of spot.hoursOpen"
              :key="dayOpen.day"
            >
              <b-form-checkbox v-model="spot.hoursOpen[index].open">
                <div class="d-flex justify-content-between">
                  <div class="day">{{ dayOpen.day }}</div>
                  <div class="time">
                    <b-form-timepicker
                      v-model="spot.hoursOpen[index].openTime"
                      locale="en"
                    ></b-form-timepicker>
                    -
                    <b-form-timepicker
                      v-model="spot.hoursOpen[index].closeTime"
                      locale="en"
                    ></b-form-timepicker>
                  </div>
                </div>
              </b-form-checkbox>
            </li>
          </ul>
        </b-form-group>

        <b-button
          block
          type="submit"
          class="custom-btn-primary"
          @click="updateSpot"
        >UPDATE SPOT</b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import previewImage from '../../../utils/fileHelper';
import getValidationState from '../../../utils/validation';
import api from '../../../api/api';
import { alert } from '../../../utils/tool';

export default {
  name: 'EditSpot',
  computed: {
    ...mapGetters(['journeyDataBySku']),
  },
  created() {
    this.getJourneyDataBySku(this.$route.params.sku);
  },
  data() {
    return {
      spot: {
        name: '',
        title: '',
        image: null,
        location: '',
        longitude: 0.0,
        latitude: 0.0,
        createdBy: '',
        price: '',
        phone: '',
        address: '',
        hoursOpen: [],
      },
      image: '',
    };
  },
  methods: {
    ...mapActions(['getJourneyDataBySku']),

    getValidationState,

    updateSpot() {
      const data = { ...this.spot };

      if (data.sku) {
        api.EditItinerary(data.sku, data)
          .then((res) => {
            alert('updated your spot', true);
            console.log(res);
          })
          .catch((err) => {
            alert('update your spot', false);
            console.log(err);
          });

        return;
      }

      api.PostItinerary(data)
        .then((res) => {
          console.log(res);
          alert('updated your spot', true);
          this.$route.push('/merchant/spot');
        })
        .catch((err) => {
          alert('update your spot', false);
          console.log(err);
        });
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    removePhoto() {
      this.image = null;
    },
  },
  mounted() {
    if (this.journeyDataBySku) {
      this.spot = { ...this.journeyDataBySku };
    }
  },
};
</script>
