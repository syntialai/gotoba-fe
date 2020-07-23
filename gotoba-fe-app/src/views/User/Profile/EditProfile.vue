<template>
  <div class="edit-profile">
    <div class="form-edit-profile pt-4 mb-5">
      <ValidationObserver>
        <b-form v-if="userDataBySku" @submit.stop.prevent="updateProfile">
          <b-form-group id="edit-img">
            <div class="d-flex justify-content-center">
              <b-avatar
                :src="userDataBySku.image"
                alt="user-profile"
                class="my-2"
                size="100"
              ></b-avatar>
            </div>
            <b-form-file
              v-model="userDataBySku.image"
              @change="loadImage"
              accept="image/jpeg, image/jpg, image/png"
            ></b-form-file>
            <b-button
              v-if="userDataBySku.image && userDataBySku.image.length > 0"
              size="sm"
              block
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
                v-model="userDataBySku.nickname"
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
                v-model="userDataBySku.username"
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
                v-model="userDataBySku.email"
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
import { alert } from '../../../utils/tool';
import api from '../../../api/api';

export default {
  name: 'EditProfile',
  computed: {
    ...mapGetters(['userDataBySku', 'userSku']),
  },
  created() {
    this.getUserBySku(this.userSku);
  },
  data() {
    return {
      image: null,
    };
  },
  methods: {
    ...mapActions(['getUserBySku', 'setUserInfo']),

    getValidationState,

    updateProfile() {
      if (!this.userDataBySku.nickname
        || !this.userDataBySku.username
        || !this.userDataBySku.email) {
        return;
      }

      const data = {
        email: this.userDataBySku.email,
        username: this.userDataBySku.username,
        nickname: this.userDataBySku.nickname,
        image: this.userDataBySku.image.toString(),
      };

      api.EditUser(this.userSku, data)
        .then((res) => {
          if (!res.error) {
            this.setUserInfo({
              name: res.nickname,
              role: res.role,
              sku: res.sku,
              image: res.image,
            });
            alert('updated profile', true);
          }
        })
        .catch((err) => {
          alert('update profile', false);
          console.log(err);
        });
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.userDataBySku.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    removePhoto() {
      this.userDataBySku.image = '';
    },
  },
};
</script>
