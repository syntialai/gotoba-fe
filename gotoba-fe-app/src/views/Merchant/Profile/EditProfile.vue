<template>
  <div class="edit-profile">
    <div class="content pt-4 px-3 mb-5">
      <ValidationObserver>
        <b-form v-if="merchantData" @submit.stop.prevent="updateProfile">
          <b-form-group id="edit-img">
            <div class="align-center">
              <b-avatar
                :src="merchantData.image"
                alt="profile"
                class="my-2"
                size="100"
              />
            </div>
            <b-form-file
              v-model="merchantData.image"
              @change="loadImage"
              accept="image/jpeg, image/jpg, image/png"
            ></b-form-file>
            <b-button
              v-if="merchantData.image !== null && merchantData.image !== ''"
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
                v-model="merchantData.nickname"
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
                v-model="merchantData.username"
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
                v-model="merchantData.email"
                type="email"
                :state="getValidationState(validationContext)"
                aria-describedby="edit-email-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="edit-email-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

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
  methods: {
    ...mapActions(['getMerchantDataBySku']),

    getValidationState,

    updateProfile() {
      if (!this.merchantData.nickname
        || !this.merchantData.username
        || !this.merchantData.email) {
        return;
      }

      const data = { ...this.merchantData };

      api.EditMerchant(this.userSku, data)
        .then((res) => {
          this.setUserInfo({
            name: res.nickname,
            role: res.role,
            sku: res.sku,
            image: res.image,
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
            this.merchantData.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    removePhoto() {
      this.merchantData.image = null;
    },
  },
};
</script>
