<template>
  <div class="edit-profile">
    <div class="container pt-4 mb-5">
      <ValidationObserver>
        <b-form v-if="merchantData" @submit.stop.prevent="updateProfile">
          <b-form-group id="edit-img">
            <b-avatar
              :src="image"
              alt="profile"
            />
            <b-form-file
              v-model="image"
              @change="loadImage"
              accept="image/jpeg, image/jpg, image/png"
            ></b-form-file>
            <b-button
              v-if="image !== user.image && image !== null"
              block
              size="sm"
              class="custom-btn-gray mt-2"
              @click="removePhoto"
            >Remove photo</b-button>
          </b-form-group>

          <ValidationProvider
            name="Nick name"
            rules="required|alpha_spaces"
            v-slot="validationContext"
          >
            <b-form-group
              id="edit-nick-name"
              label="Nick name"
              label-for="input-edit-nick-name"
            >
              <b-form-input
                id="input-edit-nick-name"
                v-model="user.nickname"
                type="text"
                :state="getValidationState(validationContext)"
                aria-describedby="edit-nick-name-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="edit-nick-name-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Username"
            rules="required|alpha_dash"
            v-slot="validationContext"
          >
            <b-form-group
              id="edit-username"
              label="Username"
              label-for="input-edit-username"
            >
              <b-form-input
                id="input-edit-username"
                v-model="user.username"
                type="text"
                :state="getValidationState(validationContext)"
                aria-describedby="edit-username-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="edit-username-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="validationContext"
          >
            <b-form-group
              id="edit-email"
              label="Email"
              label-for="input-edit-email"
            >
              <b-form-input
                id="input-edit-email"
                v-model="user.email"
                type="email"
                :state="getValidationState(validationContext)"
                aria-describedby="edit-email-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="edit-email-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-form-group
            id="edit-password"
            label="Password"
            label-for="input-edit-password"
          >
            <b-form-input
              id="input-edit-password"
              v-model="user.password"
              type="password"
              readonly
            ></b-form-input>
          </b-form-group>

          <ValidationProvider
            name="Phone number"
            rules="numeric"
            v-slot="validationContext"
          >
            <b-form-group
              id="edit-phone-number"
              label="Phone number"
              label-for="input-edit-phone-number"
            >
              <b-form-input
                id="input-edit-phone-number"
                v-model="user.phoneNumber"
                type="text"
                :state="getValidationState(validationContext)"
                aria-describedby="edit-phone-number-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="edit-phone-number-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Location"
            rules="alpha_spaces"
            v-slot="validationContext"
          >
            <b-form-group
              id="edit-location"
              label="Location"
              label-for="input-edit-location"
            >
              <b-form-input
                id="input-edit-location"
                v-model="user.location"
                type="text"
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-title-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="itinerary-title-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-form-group
            id="edit-birth-date"
            label="Birthdate"
            label-for="input-birth-date"
          >
            <b-form-datepicker
              id="input-birth-date"
              v-model="user.birthDate"
              :date-format-options="{ year: 'numeric', month: 'long', day: 'numeric' }"
            ></b-form-datepicker>
          </b-form-group>

          <b-button
            block
            class="btn custom-btn-primary mt-4"
            type="submit"
            @click="updateProfile"
          >
            UPDATE PROFILE
          </b-button>
        </b-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import getValidationState from '../../../utils/validation';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'EditProfile',
  computed: {
    ...mapGetters(['merchantData', 'userSku']),
  },
  created() {
    this.getMerchantDataBySku(this.userSku);
  },
  data() {
    return {
      user: {
        nickname: '',
        username: '',
        email: '',
        phoneNumber: '',
        location: '',
        birthDate: '', // return value YYYY-MM-DD
      },
      image: null,
    };
  },
  methods: {
    ...mapActions(['getMerchantDataBySku']),

    getValidationState,

    updateProfile() {
      if (!this.nickname
        || !this.username
        || !this.email) {
        return;
      }

      const data = { ...this.user };

      api.UpdateProfile(data)
        .then((res) => {
          this.setUserInfo({
            name: res.nickname,
            role: res.role,
            sku: res.sku,
          });
        })
        .catch((err) => {
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
    if (this.merchantData) {
      this.user = { ...this.merchantData };
    }
  },
};
</script>
