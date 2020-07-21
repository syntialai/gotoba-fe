<template>
  <div class="add-itinerary">
    <b-modal
      id="add-itinerary-modal"
      :title="title + ' Itinerary'"
      title-class="font-size-24"
      centered
      size="sm"
      @ok="submitItinerary"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <ValidationObserver v-slot="validate">
        <b-form @submit.stop.prevent="validate(submitItinerary)">
          <ValidationProvider
            name="Name"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="itinerary-name-group"
              label="Name"
              label-for="itinerary-name"
            >
              <b-form-input
                id="itinerary-name"
                v-model="itinerary.name"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-name-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="itinerary-name-feedback-msg">
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
              id="itinerary-title-group"
              label="Title"
              label-for="itinerary-title"
            >
              <b-form-input
                id="itinerary-title"
                v-model="itinerary.title"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-title-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="itinerary-title-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Photo"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="itinerary-image-group"
              label="Photo"
              label-for="itinerary-image"
            >
              <div v-if="itinerary.image === null">
                <b-form-file
                  id="itinerary-image"
                  v-model="itinerary.image"
                  @change="loadImage"
                  accept="image/jpeg, image/jpg, image/png"
                  required
                  plain
                  :state="getValidationState(validationContext)"
                  aria-describedby="itinerary-image-feedback-msg"
                ></b-form-file>
                <b-form-invalid-feedback id="itinerary-image-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </div>
              <div v-else>
                <b-img :src="itinerary.image" center :width="100"></b-img>
                <b-button
                  size="sm"
                  class="custom-btn-gray mt-2"
                  @click="removePhoto"
                >Remove photo</b-button>
              </div>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Location"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="itinerary-location-group"
              label="Location"
              label-for="itinerary-location"
            >
              <b-form-input
                id="itinerary-location"
                v-model="itinerary.location"
                list="location-list"
                type="text"
                class="border-gray"
                required
                @change="locationSuggestions"
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-location-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="itinerary-location-feedback-msg">
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
            name="Price"
            :rules="{ required: true, numeric: true, min: 0 }"
            v-slot="validationContext"
          >
            <b-form-group
              id="itinerary-price-group"
              label="Price"
              label-for="itinerary-price"
            >
              <b-form-input
                id="itinerary-price"
                v-model="itinerary.price"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-price-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="itinerary-price-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Address"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="itinerary-address-group"
              label="Address"
              label-for="itinerary-address"
            >
              <b-form-textarea
                id="itinerary-address"
                v-model="itinerary.address"
                rows="5"
                max-rows="6"
                class="border-gray"
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-address-feedback-msg"
              ></b-form-textarea>
              <b-form-invalid-feedback id="itinerary-address-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Description"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="itinerary-description-group"
              label="Description"
              label-for="itinerary-description"
            >
              <b-form-textarea
                id="itinerary-description"
                v-model="itinerary.description"
                rows="5"
                max-rows="6"
                class="border-gray"
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-description-feedback-msg"
              ></b-form-textarea>
              <b-form-invalid-feedback id="itinerary-description-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import getValidationState from '../../../utils/validation';
import { alert } from '../../../utils/tool';
import previewImage from '../../../utils/fileHelper';
import getLocation from '../../../utils/location';
import api from '../../../api/api';

export default {
  name: 'ItineraryModal',
  computed: {
    ...mapState(['journeyDataBySku']),
    ...mapGetters(['journeyData', 'userSku']),
  },
  data() {
    return {
      itinerary: { ...this.journeyDataBySku },
      locationList: null,
    };
  },
  props: {
    title: {
      type: String,
      default: 'Add',
    },
  },
  methods: {
    getValidationState,

    submitItinerary() {
      const data = { ...this.itinerary };
      data.createdBy = this.userSku;

      if (data.title === '' || data.image === null || data.description === '') {
        return;
      }

      if (this.title === 'Add') {
        api.PostItinerary(data)
          .then((res) => {
            if (!res.error) {
              alert('added itinerary', true);
              return;
            }
            alert('add itinerary', false);
          })
          .catch((err) => {
            alert('add itinerary', false);
            console.log(err);
          });

        return;
      }

      api.EditItinerary(this.itinerary.sku, data)
        .then((res) => {
          if (!res.error) {
            alert('updated itinerary', true);
            return;
          }
          alert('update itinerary', false);
        })
        .catch((err) => {
          alert('update itinerary', true);
          console.log(err);
        });
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.itinerary.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    removePhoto() {
      this.itinerary.image = null;
    },

    locationSuggestions() {
      if (this.itinerary.location) {
        api.GetSearchLocationResult(this.itinerary.location)
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
      this.itinerary.longitude = position.coords.longitude;
      this.itinerary.latitude = position.coords.latitude;

      api.ReverseGeocoding(this.itinerary.longitude, this.itinerary.latitude)
        .then((res) => {
          this.itinerary.address = res.display_name;
          this.itinerary.location = `${res.address.suburb}, ${res.address.city}`;
        })
        .catch((err) => {
          console.log(err);
        });
    }, (err) => {
      console.log(err);
    });
  },
};
</script>
