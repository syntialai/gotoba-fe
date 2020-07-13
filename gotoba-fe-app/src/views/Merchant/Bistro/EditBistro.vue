<template>
  <div class="edit-bistro mt-2 p-3">
    <ValidationObserver v-slot="validate">
      <b-form @submit.stop.prevent="validate(updateBistro)">
        <ValidationProvider
          name="Restaurant Image"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group>
            <div class="d-flex justify-content-center">
              <b-avatar
                :src="image"
                alt="Bistro-profile"
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
              v-if="image !== bistro.image && image !== null"
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
            <b-form-input
              id="bistro-location"
              v-model="bistro.location"
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
          name="Bistro Type"
          rules="required"
          v-slot="validationContext"
        >
          <b-form-group
            v-if="bistroType"
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
          <ul class="list-unstyled">
            <li
              v-for="(dayOpen, index) of bistro.hoursOpen"
              :key="dayOpen.day"
            >
              <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="day semibold">{{ dayOpen.day }}</div>
                <div
                  class="time ml-3 d-flex justify-content-between"
                >
                  <b-form-timepicker
                    v-model="bistro.hoursOpen[index].openTime"
                    locale="en"
                  ></b-form-timepicker>
                  <div class="mx-2">-</div>
                  <b-form-timepicker
                    v-model="bistro.hoursOpen[index].closeTime"
                    locale="en"
                  ></b-form-timepicker>
                </div>
              </div>
            </li>
          </ul>
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
import { alert } from '../../../utils/tool';
import api from '../../../api/api';
import getValidationState from '../../../utils/validation';
import previewImage from '../../../utils/fileHelper';
import getLocation from '../../../utils/location';

export default {
  name: 'EditBistro',
  computed: {
    ...mapGetters(['restaurantData', 'bistroType', 'userSku']),
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.userSku);
    this.getRestaurantBistroType();
  },
  data() {
    return {
      bistro: {
        name: '',
        image: null,
        location: '',
        longitude: 10.905354,
        latitude: 42.905354,
        rating: 0.0,
        bistroType: '',
        phone: '',
        address: '',
        hoursOpen: [
          {
            day: 'Monday', openTime: '', closeTime: '',
          },
          {
            day: 'Tuesday', openTime: '', closeTime: '',
          },
          {
            day: 'Wednesday', openTime: '', closeTime: '',
          },
          {
            day: 'Thursday', openTime: '', closeTime: '',
          },
          {
            day: 'Friday', openTime: '', closeTime: '',
          },
          {
            day: 'Saturday', openTime: '', closeTime: '',
          },
          {
            day: 'Sunday', openTime: '', closeTime: '',
          },
        ],
      },
      bistroTypeOptions: [
        'All-day cafe',
        'All-you-can-eat restaurant',
        'Automat',
        'Automated restaurant',
        'Bakery',
        'Bar',
        'Bar mleczny',
        'Bistro',
        'Bouchon',
        'Brasserie',
        'Breastaurant',
        'Bridge restaurant',
        'Cafe (British)',
        'Café gourmand',
        'Cafeteria',
        'Cakery',
        'Cantina',
        'Carvery',
        'Chifa',
        'Chiringuito',
        'Chuckwagon',
        'Churrascaria',
        'Coffeehouse',
        'Coney Island (restaurant)',
        'Concession stand',
        'Cosplay restaurant',
        'Diner',
        'Dining car',
        'Dining room',
        'Dinner theater',
        'Dinner train',
        'Drive-in',
        'Drive-through',
        'Farm Stall',
        'Fast food restaurant',
        'Fast casual restaurant',
        'Fish and chip shop',
        'Floating restaurant',
        'Food booth',
        'Food cart',
        'Food court',
        'Food truck',
        'Gastropub',
        'Ghost restaurant',
        'Greasy spoon',
        'Hawker centre ',
        'Health food',
        'Ice cream cart',
        'Ice cream van',
        'Juke joint',
        'Kopi tiam',
        'Milk bar',
        'Mobile catering',
        'Mystery dinner',
        'Pancake house',
        'Pie and mash',
        'Pizza delivery',
        'Pop-up restaurant',
        'Ramen shop',
        'Raw bar',
        'Revolving restaurant',
        'Sandwich bar',
        'Seafood restaurant',
        'Snack bar',
        'Soda shop',
        'Soup kitchen',
        'Steakhouse',
        'Strausse',
        'Supper club',
        'Take-out',
        'Tower restaurant',
        'Truck stop',
        'Underground restaurant',
      ],
      image: null,
      locationList: null,
    };
  },
  methods: {
    ...mapActions(['getRestaurantDataByMerchantSku', 'getRestaurantBistroType']),

    getValidationState,

    updateBistro() {
      const data = this.bistro;

      console.log(data);
      if (this.restaurantData) {
        api.EditRestaurant(this.restaurantData.sku, data)
          .then((res) => {
            alert('updated your bistro', true);
            console.log(res);
          })
          .catch((err) => {
            alert('update your bistro', false);
            console.log(err);
          });

        return;
      }

      api.PostRestaurant(this.userSku, data)
        .then((res) => {
          console.log(res);
          alert('added your bistro', true);
          this.$router.push('/merchant/bistro');
        })
        .catch((err) => {
          alert('add your bistro', false);
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

    locationSuggestions() {
      if (this.bistro.location) {
        api.GetSearchLocationResult(this.bistro.location)
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
    if (this.restaurantData) {
      this.bistro = { ...this.restaurantData };
    }

    getLocation((position) => {
      this.bistro.longitude = position.coords.longitude;
      this.bistro.latitude = position.coords.latitude;

      api.ReverseGeocoding(this.bistro.longitude, this.bistro.latitude)
        .then((res) => {
          this.bistro.address = res.display_name;
          this.bistro.location = `${res.address.suburb}, ${res.address.city}`;
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
