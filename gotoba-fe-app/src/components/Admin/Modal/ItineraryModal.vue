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
              <div v-if="!itinerary.image || itinerary.image === ''">
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
                type="number"
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

          <b-form-group
            id="itinerary-hours-open-group"
            label="Hours Open"
            label-for="itinerary-hours-open"
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
import { mapGetters, mapActions } from 'vuex';
import getValidationState from '../../../utils/validation';
import { setAlert } from '../../../utils/tool';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'ItineraryModal',
  computed: {
    ...mapGetters(['journeyDataBySku', 'userSku']),
    imageUrl() {
      return api.imageUrl(this.journeyDataBySku.image);
    },
  },
  created() {
    if (this.title !== 'Edit') {
      this.setJourneyDataBySku({});
    }
  },
  data() {
    return {
      itinerary: {
        name: '',
        title: '',
        image: null,
        location: '',
        longitude: 0,
        latitude: 0,
        price: 0,
        address: '',
        description: '',
        createdBy: '',
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
      open: null,
      close: null,
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
    ...mapActions([
      'setJourneyDataBySku',
      'getJourneyDataBySku',
      'getJourneyData',
      'getJourneyDataByMerchantSku',
    ]),

    getValidationState,

    submitItinerary() {
      const data = { ...this.itinerary };
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

      if (this.title === 'Add') {
        api.PostItinerary(data)
          .then((res) => {
            if (!res.error) {
              setAlert('added itinerary', true);
              this.getJourneyData();
              this.getJourneyDataByMerchantSku(this.userSku);
              return;
            }
            setAlert('add itinerary', false);
          })
          .catch((err) => {
            setAlert('add itinerary', false);
            console.log(err);
          });

        return;
      }

      api.EditItinerary(this.journeyDataBySku.sku, data)
        .then((res) => {
          if (!res.error) {
            setAlert('updated itinerary', true);
            return;
          }
          setAlert('update itinerary', false);
        })
        .catch((err) => {
          setAlert('update itinerary', false);
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
      if (this.itinerary.location.length >= 3) {
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
    this.itinerary = { ...this.journeyDataBySku };
    this.itinerary.image = this.imageUrl;
    this.itinerary.location = this.itinerary.address;
    this.itinerary.hoursOpen = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    console.log(this.itinerary);
  },
};
</script>
