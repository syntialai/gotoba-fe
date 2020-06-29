<template>
  <div class="edit-bistro">
    <b-form @submit="updateBistro">
      <b-form-group>
        <b-img></b-img>
        <b-form-file
          v-model="restaurantData.image"
          :state="Boolean(restaurantData.image)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>

      <b-form-group
        id="bistro-name-group"
        label="Bistro Name"
        label-for="bistro-name"
      >
        <b-form-input
          id="bistro-name"
          v-model="restaurantData.name"
          type="text"
          class="border-gray"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="bistro-location-group"
        label="Location"
        label-for="bistro-location"
      >
        <b-form-input
          id="bistro-location"
          v-model="restaurantData.location"
          type="text"
          class="border-gray"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="bistro-type-group"
        label="Bistro Type"
        label-for="bistro-type"
      >
        <b-form-select
          v-model="restaurantData.bistroType"
          :options="bistroTypeOptions"
          class="border-gray"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="bistro-phone-number-group"
        label="Phone Number"
        label-for="bistro-phone-number"
      >
        <b-form-input
          id="bistro-phone-number"
          v-model="restaurantData.phone"
          type="text"
          class="border-gray"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="bistro-full-address-group"
        label="Full Address"
        label-for="bistro-full-address"
      >
        <b-form-input
          id="bistro-full-address"
          v-model="restaurantData.address"
          type="text"
          class="border-gray"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="bistro-hours-open-group"
        label="Hours Open"
        label-for="bistro-hours-open"
      >
        <ul class="list-unstyled">
          <li
            v-for="(dayOpen, index) of restaurantData.hoursOpen"
            :key="dayOpen.day"
          >
            <b-form-checkbox v-model="restaurantData.hoursOpen[index].open">
              <div class="d-flex justify-content-between">
                <div class="day">{{ dayOpen.day }}</div>
                <div class="time">
                  <b-form-timepicker
                    v-model="restaurantData.hoursOpen[index].openTime"
                    locale="en"
                  ></b-form-timepicker>
                  -
                  <b-form-timepicker
                    v-model="restaurantData.hoursOpen[index].closeTime"
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
  name: 'EditBistro',
  computed: {
    ...mapGetters(['restaurantData', 'userInfo']),
    ...mapState(['restaurantData']),
  },
  created() {
    this.getRestaurantDataByMerchantSku(this.userInfo.sku);
  },
  data() {
    return {
      bistro: {
        name: '',
        image: null,
        location: '',
        bistroType: '',
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
      bistroTypeOptions: ['A', 'B'],
    };
  },
  methods: {
    ...mapActions(['getRestaurantDataByMerchantSku']),
    updateBistro() {
      const data = this.restaurantData;

      if (data.sku) {
        api.EditRestaurant(data.sku, data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      api.PostRestaurant(data)
        .then((res) => {
          console.log(res);
          this.$route.push('/merchant/bistro');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
