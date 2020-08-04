<template>
  <div class="edit-bistro mt-2 p-3">
    <ValidationObserver>
      <b-form @submit.stop.prevent="updateBistro">
        <ValidationProvider
          name="Restaurant Image"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group>
            <div class="d-flex justify-content-center">
              <b-avatar
                :src="bistro.image"
                alt="Bistro-profile"
                class="my-3"
                size="100"
              ></b-avatar>
            </div>
            <b-form-file
              v-model="bistro.image"
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
              v-if="bistro.image !== null"
              size="sm"
              class="custom-btn-gray mt-2"
              @click="removePhoto"
            >Remove photo</b-button>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          name="Bistro Name"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group
            id="bistro-name-group"
            label="Bistro Name"
            label-for="bistro-name"
          >
            <b-form-input
              id="bistro-name"
              v-model="bistro.name"
              type="text"
              class="border-gray"
              required
              :state="getValidationState(validationContext)"
              aria-describedby="edit-bistro-name-feedback-msg"
            ></b-form-input>
            <b-form-invalid-feedback id="edit-bistro-name-feedback-msg">
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
            id="bistro-location-group"
            label="Location"
            label-for="bistro-location"
          >
            <b-input-group>
              <b-form-input
                id="bistro-location"
                v-model="bistro.location"
                type="text"
                class="border-gray"
                required
                disabled
                :state="getValidationState(validationContext)"
                aria-describedby="edit-location-feedback-msg"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  to="/merchant/set-location/bistro"
                  variant="outline-secondary"
                  class="d-flex align-items-center"
                >
                  <font-awesome-icon
                    class="icon-accent-green"
                    icon="map-marked-alt"
                  ></font-awesome-icon>
                  <div class="font-size-12 ml-2">
                    Select via Map
                  </div>
                </b-button>
              </b-input-group-append>

              <b-form-invalid-feedback id="edit-location-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          name="Bistro Type"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group
            v-if="bistroType && bistroType.length > 0"
            id="bistro-type-group"
            label="Bistro Type"
            label-for="bistro-type"
          >
            <b-form-select
              v-model="bistro.bistroType"
              :options="bistroType"
              class="border-gray"
              required
              :state="getValidationState(validationContext)"
              aria-describedby="edit-bistro-type-feedback-msg"
            ></b-form-select>
            <b-form-invalid-feedback id="edit-bistro-type-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          name="Bistro rating"
          :rules="{ numeric: true, min: 1, max: 5 }"
          v-slot="validationContext"
        >
          <b-form-group
              id="bistro-rating-group"
              label="Rating"
              label-for="bistro-rating"
            >
              <b-form-spinbutton
                id="bistro-rating"
                v-model="bistro.rating"
                :min="1"
                :max="5"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="bistro-rating-feedback-msg"
              ></b-form-spinbutton>
              <b-form-invalid-feedback id="bistro-rating-feedback-msg">
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
            id="bistro-phone-number-group"
            label="Phone Number"
            label-for="bistro-phone-number"
          >
            <b-form-input
              id="bistro-phone-number"
              v-model="bistro.phone"
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
            id="bistro-full-address-group"
            label="Full Address"
            label-for="bistro-full-address"
          >
            <b-form-input
              id="bistro-full-address"
              v-model="bistro.address"
              type="text"
              class="border-gray"
              :state="getValidationState(validationContext)"
              aria-describedby="edit-full-address-feedback-msg"
            ></b-form-input>
            <b-form-invalid-feedback id="edit-full-address-feedback-msg">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <b-form-group
          id="bistro-hours-open-group"
          label="Hours Open"
          label-for="bistro-hours-open"
        >
          <div class="d-flex justify-content-between align-items-center mb-2">
            <b-form-timepicker
              v-model="open"
              locale="en"
              required
            ></b-form-timepicker>
            <div class="mx-2">-</div>
            <b-form-timepicker
              v-model="close"
              locale="en"
              required
            ></b-form-timepicker>
          </div>
        </b-form-group>

        <b-button
          block
          type="submit"
          class="custom-btn-primary"
          @click="updateBistro"
        >UPDATE BISTRO</b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { setAlert } from '../../../utils/tool';
import api from '../../../api/api';
import getValidationState from '../../../utils/validation';
import previewImage from '../../../utils/fileHelper';
import getLocation from '../../../utils/location';

export default {
  name: 'EditBistro',
  computed: {
    ...mapGetters(['restaurantData', 'bistroType', 'userSku', 'locationSet']),
    imageUrl() {
      return api.imageUrl(this.restaurantData[0].image);
    },
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.userSku);
    this.getRestaurantBistroType();
    if (this.locationSet.location) {
      Object.assign(this.bistro, this.locationSet);
    }
  },
  data() {
    return {
      open: '',
      close: '',
      bistro: {
        name: '',
        image: null,
        location: '',
        longitude: 0,
        latitude: 0,
        rating: 0.0,
        bistroType: '',
        phone: '',
        address: '',
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
      image: null,
    };
  },
  methods: {
    ...mapActions([
      'getRestaurantDataByMerchantSku',
      'getRestaurantBistroType',
      'setLocation',
    ]),

    getValidationState,

    updateBistro() {
      const data = this.bistro;

      if (!this.open
        || !this.close
        || data.name === ''
        || data.image === null
        || data.location === ''
        || data.longitude === 0
        || data.latitude === 0
        || data.rating === 0
        || data.bistroType === ''
        || data.phone === ''
        || data.address === ''
      ) {
        return;
      }

      data.merchantSku = this.userSku;

      Object.keys(data.hoursOpen)
        .forEach((key) => {
          data.hoursOpen[key] = [
            this.open,
            this.close,
          ];
        });

      if (this.restaurantData[0]) {
        api.EditRestaurant(this.restaurantData[0].sku, data)
          .then((res) => {
            setAlert('updated your bistro', true);
            console.log(res);
          })
          .catch((err) => {
            setAlert('update your bistro', false);
            console.log(err);
          });

        return;
      }

      api.PostRestaurant(this.userSku, data)
        .then((res) => {
          console.log(res);
          setAlert('added your bistro', true);
          this.$router.push('/merchant/bistro');
        })
        .catch((err) => {
          setAlert('add your bistro', false);
          console.log(err);
        });
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.bistro.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    removePhoto() {
      this.bistro.image = null;
    },
  },
  mounted() {
    if (!this.locationSet.location) {
      getLocation((position) => {
        this.bistro.longitude = position.coords.longitude;
        this.bistro.latitude = position.coords.latitude;

        api.ReverseGeocoding(this.bistro.longitude, this.bistro.latitude)
          .then((res) => {
            this.bistro.address = res.display_name;
            this.bistro.location = `${res.address.suburb}, ${res.address.city}`;
            this.setLocation({
              longitude: this.bistro.longitude,
              latitude: this.bistro.latitude,
              address: this.bistro.address,
              location: this.bistro.location,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, (err) => {
        console.log(err);
      });
    }
  },
  watch: {
    restaurantData() {
      this.bistro = { ...this.restaurantData[0] };
      this.bistro.image = this.imageUrl;
      this.bistro.location = this.bistro.address;
      [this.open, this.close] = this.bistro.hoursOpen.monday;
    },
  },
};
</script>
