<template>
  <div class="edit-spot mt-2 p-3">
    <ValidationObserver>
      <b-form @submit.stop.prevent="updateSpot">
        <ValidationProvider
          name="Spot Image"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group>
            <div class="d-flex justify-content-center">
              <b-avatar
                :src="spot.image"
                alt="Spot-profile"
                class="my-3"
                size="100"
              ></b-avatar>
            </div>
            <b-form-file
              v-model="spot.image"
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
              v-if="spot.image !== null"
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
            name="Title"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="spot-title-group"
              label="Title"
              label-for="spot-title"
            >
              <b-form-input
                id="spot-title"
                v-model="spot.title"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="spot-title-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="spot-title-feedback-msg">
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
              list="location-list"
              type="text"
              class="border-gray"
              required
              @change="locationSuggestions"
              :state="getValidationState(validationContext)"
              aria-describedby="edit-location-feedback-msg"
            ></b-form-input>
            <b-form-invalid-feedback id="edit-location-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>

            <datalist
              id="location-list"
              v-if="locationList"
            >
              <option
                v-for="location in locationList"
                :key="location"
              >
                {{ location }}
              </option>
            </datalist>
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
          <div class="d-flex justify-content-between">
            <b-form-timepicker
              v-model="open"
              locale="en"
            ></b-form-timepicker>
            -
            <b-form-timepicker
              v-model="close"
              locale="en"
            ></b-form-timepicker>
          </div>
        </b-form-group>

        <ValidationProvider
            name="Description"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="spot-description-group"
              label="Description"
              label-for="spot-description"
            >
              <b-form-textarea
                id="spot-description"
                v-model="spot.description"
                rows="5"
                max-rows="6"
                class="border-gray"
                :state="getValidationState(validationContext)"
                aria-describedby="spot-description-feedback-msg"
              ></b-form-textarea>
              <b-form-invalid-feedback id="spot-description-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

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
import { setAlert } from '../../../utils/tool';
import getLocation from '../../../utils/location';

export default {
  name: 'EditSpot',
  computed: {
    ...mapGetters(['journeyDataBySku', 'userSku']),
    imageUrl() {
      return api.imageUrl(this.journeyDataBySku.image);
    },
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
        address: '',
        description: '',
        hoursOpen: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
      },
      locationList: null,
      open: null,
      close: null,
    };
  },
  methods: {
    ...mapActions(['getJourneyDataBySku']),

    getValidationState,

    updateSpot() {
      const data = { ...this.spot };

      data.createdBy = this.userSku;

      Object.keys(data.hoursOpen)
        .forEach((key) => {
          data.hoursOpen[key] = [
            this.open,
            this.close,
          ];
        });

      if (data.title === ''
        || data.image === null
        || data.description === '') {
        return;
      }

      api.EditItinerary(data.sku, data)
        .then((res) => {
          setAlert('updated your spot', true);
          console.log(res);
        })
        .catch((err) => {
          setAlert('update your spot', false);
          console.log(err);
        });
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.spot.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
            setAlert('to show photo', false);
          });
      }
    },

    removePhoto() {
      this.spot.image = null;
    },

    locationSuggestions() {
      if (this.spot.location) {
        api.GetSearchLocationResult(this.spot.location)
          .then((res) => {
            this.locationList = res.map((item) => item.display_name);
            console.log(this.locationList);
          })
          .catch((err) => {
            console.log(err);
            this.locationList = null;
          });
      }
    },
  },
  mounted() {
    getLocation((position) => {
      this.spot.longitude = position.coords.longitude;
      this.spot.latitude = position.coords.latitude;

      api.ReverseGeocoding(this.spot.longitude, this.spot.latitude)
        .then((res) => {
          this.spot.address = res.display_name;
          this.spot.location = `${res.address.suburb}, ${res.address.city}`;
        })
        .catch((err) => {
          console.log(err);
        });
    }, (err) => {
      console.log(err);
    });
  },
  watch: {
    journeyDataBySku() {
      this.spot = { ...this.journeyDataBySku };
      this.spot.image = this.imageUrl;
      this.spot.location = this.spot.address;
      [this.open, this.close] = this.spot.hoursOpen.monday;
    },
  },
};
</script>
