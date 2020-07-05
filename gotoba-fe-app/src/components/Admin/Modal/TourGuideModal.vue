<template>
  <div class="add-tour-guide">
    <b-modal
      id="add-tour-guide-modal"
      :title="title + ' Tour Guide'"
      title-class="font-size-24"
      centered
      size="sm"
      @ok="submitTourGuide"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <ValidationObserver>
        <b-form @submit.stop.prevent="submitTourGuide">
          <ValidationProvider
            name="Name"
            :rules="{ required: true, alpha_spaces: true, min: 3 }"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-name-group"
              label="Name"
              label-for="tour-guide-name"
            >
              <b-form-input
                id="tour-guide-name"
                v-model="tourGuide.name"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-name-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="tour-guide-location-feedback-msg">
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
              id="tour-guide-image-group"
              label="Photo"
              label-for="tour-guide-image"
            >
              <div v-if="tourGuide.image === null">
                <b-form-file
                  id="photo-image"
                  v-model="tourGuide.image"
                  @change="loadImage"
                  accept="image/jpeg, image/jpg, image/png"
                  required
                  plain
                  :state="getValidationState(validationContext)"
                  aria-describedby="tour-guide-image-feedback-msg"
                ></b-form-file>
                <b-form-invalid-feedback id="tour-guide-location-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </div>
              <div v-else>
                <b-img :src="tourGuide.image" center :width="100"></b-img>
                <b-button
                  size="sm"
                  class="custom-btn-gray mt-2"
                  @click="removePhoto"
                >Remove photo</b-button>
              </div>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Born Date"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-born-date-group"
              label="Born Date"
              label-for="tour-guide-born-date"
            >
              <b-form-datepicker
                id="tour-guide-born-date"
                v-model="tourGuide.bornDate"
                :max="new Date()"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-born-date-feedback-msg"
              ></b-form-datepicker>
              <b-form-invalid-feedback id="tour-guide-born-date-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Gender"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-gender-group"
              label="Gender"
              label-for="tour-guide-gender"
            >
              <b-form-select
                id="tour-guide-gender"
                v-model="tourGuide.gender"
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-gender-feedback-msg"
              >
                <b-form-select-option value="female">Female</b-form-select-option>
                <b-form-select-option value="male">Male</b-form-select-option>
                <b-form-select-option value="other">Other</b-form-select-option>
              </b-form-select>
              <b-form-invalid-feedback id="tour-guide-gender-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Occupation"
            rules="required|alpha_spaces"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-occupation-group"
              label="Occupation"
              label-for="tour-guide-occupation"
            >
              <b-form-input
                id="tour-guide-occupation"
                v-model="tourGuide.occupation"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-occupation-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="tour-guide-occupation-feedback-msg">
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
              id="tour-guide-location-group"
              label="Location"
              label-for="tour-guide-location"
            >
              <b-form-select
                id="tour-guide-location"
                v-model="tourGuide.location"
                :options="locationOptions"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-location-feedback-msg"
              ></b-form-select>
              <b-form-invalid-feedback id="tour-guide-location-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Language"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-language-group"
              label="Language"
              label-for="tour-guide-language"
            >
              <b-form-tags
                input-id="tour-guide-language"
                v-model="tourGuide.language"
                separator=" ,;"
                required
                placeholder="Add a tag"
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-language-feedback-msg"
              ></b-form-tags>
              <b-form-invalid-feedback id="tour-guide-language-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Available Location"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-available-location-group"
              label="Available location"
              label-for="tour-guide-available-location"
            >
              <b-form-select
                id="tour-guide-available-location"
                v-model="tourGuide.availableLocation"
                :options="locationOptions"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-available-location-feedback-msg"
              ></b-form-select>
              <b-form-invalid-feedback id="tour-guide-available-location-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Phone Number"
            rules="required|numeric"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-phone-number-group"
              label="Phone number"
              label-for="tour-guide-phone-number"
            >
              <b-form-input
                id="tour-guide-phone-number"
                v-model="tourGuide.phoneNumber"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-phone-number-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="tour-guide-phone-number-feedback-msg">
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
              id="tour-guide-email-group"
              label="Email"
              label-for="tour-guide-email"
            >
              <b-form-input
                id="tour-guide-email"
                v-model="tourGuide.email"
                type="email"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-email-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="tour-guide-email-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Whatsapp"
            rules="required|numeric"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-whatsapp-group"
              label="Whatsapp"
              label-for="tour-guide-whatsapp"
            >
              <b-form-input
                id="tour-guide-whatsapp"
                v-model="tourGuide.whatsapp"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-whatsapp-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="tour-guide-whatsapp-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-form-group
            id="tour-guide-experience-group"
            label="Experience"
            label-for="tour-guide-experience"
          >
            <b-form-textarea
              id="tour-guide-experience"
              v-model="tourGuide.experience"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            id="tour-guide-description-group"
            label="Description"
            label-for="tour-guide-description"
          >
            <b-form-textarea
              id="tour-guide-description"
              v-model="tourGuide.description"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getValidationState from '../../../utils/validation';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'TourGuideModal',
  computed: {
    ...mapGetters(['tourGuideData']),
  },
  data() {
    return {
      tourGuide: {
        name: '',
        image: null,
        bornDate: Date(),
        gender: '',
        occupation: '',
        location: '',
        language: [],
        availableLocation: '',
        phoneNumber: '',
        email: '',
        whatsapp: '',
        experience: '',
        description: '',
      },
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

    submitTourGuide() {
      const data = { ...this.tourGuide };

      if (this.title === 'Add') {
        api.PostTourGuide(data)
          .then((res) => {
            console.log(res);
            this.$router.push({ path: '/admin/tour-guide' });
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      api.EditTourGuide(this.$route.params.sku, data)
        .then((res) => {
          console.log(res);
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
            this.tourGuide.image = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    removePhoto() {
      this.tourGuide.image = null;
    },
  },
};
</script>
