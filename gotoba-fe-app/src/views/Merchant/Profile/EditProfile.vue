<template>
  <div class="edit-profile">
    <div class="content pt-4 px-3 mb-5">
      <ValidationObserver>
        <b-form v-if="merchantData" @submit.stop.prevent="updateProfile">
          <b-form-group id="edit-img">
            <div class="align-center">
              <b-avatar
                :src="merchant.image"
                alt="profile"
                class="my-2"
                size="100"
              />
            </div>
            <b-form-file
              v-model="merchant.image"
              @change="loadImage"
              accept="image/jpeg, image/jpg, image/png"
            ></b-form-file>
            <b-button
              v-if="merchant.image !== ''"
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
                v-model="merchant.nickname"
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
                v-model="merchant.username"
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
                v-model="merchant.email"
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
import { setAlert } from '../../../utils/tool';
import api from '../../../api/api';

export default {
  name: 'EditProfile',
  computed: {
    ...mapGetters(['merchantData', 'userSku']),
    imageUrl() {
      return api.imageUrl(this.merchant.image);
    },
  },
  created() {
    this.getMerchantDataBySku(this.userSku);
  },
  data() {
    return {
      merchant: {
        nickname: '',
        username: '',
        email: '',
        image: '',
      },
    };
  },
  methods: {
    ...mapActions(['getMerchantDataBySku', 'setUserInfo']),
    getValidationState,
    updateProfile() {
      if (!this.merchant.nickname
        || !this.merchant.username
        || !this.merchant.email) {
        return;
      }

      const data = { ...this.merchant };

      api.EditUser(this.userSku, data)
        .then((res) => {
          if (!res.error) {
            this.setUserInfo({
              name: res.data.nickname,
              role: res.data.roles,
              sku: res.data.sku,
              image: res.data.image,
            });
            setAlert('updated profile', true);
            return;
          }
          setAlert('update profile', false);
        })
        .catch((err) => {
          setAlert('update profile', false);
          console.log(err);
        });
    },
    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.merchant.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    removePhoto() {
      this.merchant.image = '';
    },
  },
  watch: {
    merchantData() {
      this.merchant = { ...this.merchantData };
      this.merchant.image = this.imageUrl;
    },
  },
};
</script>
