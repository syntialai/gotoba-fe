<template>
  <div class="edit-bistro">
    <b-form @submit="updateBistro">
      <b-form-group>
        <b-img></b-img>
        <b-form-file
          v-model="bistro.image"
          :state="Boolean(bistro.image)"
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
          v-model="bistro.name"
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
          v-model="bistro.location"
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
          v-model="bistro.bistroType"
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
          v-model="bistro.phone"
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
          v-model="bistro.address"
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
          <li v-for="(dayOpen, index) of hoursOpen" :key="dayOpen.day">
            <b-form-checkbox v-model="hoursOpen[index].open">
              <div class="d-flex justify-content-between">
                <div class="day">{{ dayOpen.day }}</div>
                <div class="time">
                  <b-form-timepicker
                    v-model="hoursOpen[index].openTime"
                    locale="en"
                  ></b-form-timepicker>
                  -
                  <b-form-timepicker
                    v-model="hoursOpen[index].closeTime"
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
import api from '../../../api/api';

export default {
  name: 'EditBistro',
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
    updateBistro() {
      const data = this.bistro;

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
