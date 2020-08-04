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
              <b-form-invalid-feedback id="tour-guide-name-feedback-msg">
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
              <div v-if="!tourGuide.image || tourGuide.image === null">
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
                <b-form-invalid-feedback id="tour-guide-image-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </div>
              <div v-else>
                <b-img
                  :src="tourGuide.image"
                  center
                  :width="100"
                ></b-img>
                <b-button
                  size="sm"
                  class="custom-btn-gray mt-2"
                  @click="removePhoto"
                >Remove photo</b-button>
              </div>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Age"
            rules="required|numeric"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-age-group"
              label="Age"
              label-for="tour-guide-age"
            >
              <b-form-input
                id="tour-guide-age"
                v-model="tourGuide.age"
                type="number"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-age-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="tour-guide-age-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Rating"
            rules="required|numeric|min:1"
            v-slot="validationContext"
          >
            <b-form-group
              id="tour-guide-rating-group"
              label="Rating"
              label-for="tour-guide-rating"
            >
              <b-form-spinbutton
                id="tour-guide-rating"
                v-model="tourGuide.rating"
                min="1"
                max="5"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-rating-feedback-msg"
              ></b-form-spinbutton>
              <b-form-invalid-feedback id="tour-guide-rating-feedback-msg">
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
              <b-form-input
                id="tour-guide-location"
                v-model="tourGuide.location"
                list="location-list"
                required
                @input="locationSuggestions"
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-location-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="tour-guide-location-feedback-msg">
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
              <b-form-checkbox-group
                id="tour-guide-available-location"
                v-model="tourGuide.availableLocation"
                :options="locationOptions"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="tour-guide-available-location-feedback-msg"
              ></b-form-checkbox-group>
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
                v-model="tourGuide.phone"
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
import { mapGetters, mapActions } from 'vuex';
import getValidationState from '../../../utils/validation';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';
import { setAlert } from '../../../utils/tool';

export default {
  name: 'TourGuideModal',
  computed: {
    ...mapGetters(['tourGuideData']),
    imageUrl() {
      return api.imageUrl(this.tourGuideData.image);
    },
  },
  created() {
    if (this.title === 'Edit') {
      this.getTourGuideBySku(this.$route.params.sku);
    } else {
      this.setTourGuideBySku({});
    }
  },
  data() {
    return {
      tourGuide: {
        name: '',
        image: null,
        age: 0,
        rating: 1,
        occupation: '',
        location: '',
        language: [],
        availableLocation: [],
        phone: '',
        email: '',
        whatsapp: '',
        experience: '',
        description: '',
      },
      locationOptions: [
        { text: 'Asahan', value: 'Asahan' },
        { text: 'Batu Bara', value: 'Batu Bara' },
        { text: 'Dairi', value: 'Dairi' },
        { text: 'Deli Serdang', value: 'Deli Serdang' },
        { text: 'Humbang Hasundutan', value: 'Humbang Hasundutan' },
        { text: 'Karo', value: 'Karo' },
        { text: 'Labuhanbatu', value: 'Labuhanbatu' },
        { text: 'Labuhanbatu Selatan', value: 'Labuhanbatu Selatan' },
        { text: 'Labuhanbatu Utara', value: 'Labuhanbatu Utara' },
        { text: 'Langkat', value: 'Langkat' },
        { text: 'Mandailing Natal', value: 'Mandailing Natal' },
        { text: 'Nias', value: 'Nias' },
        { text: 'Nias Barat', value: 'Nias Barat' },
        { text: 'Nias Selatan', value: 'Nias Selatan' },
        { text: 'Nias Utara', value: 'Nias Utara' },
        { text: 'Padang Lawas', value: 'Padang Lawas' },
        { text: 'Padang Lawas Utara', value: 'Padang Lawas Utara' },
        { text: 'Pakpak Barat', value: 'Pakpak Barat' },
        { text: 'Samosir', value: 'Samosir' },
        { text: 'Serdang Bedagai', value: 'Serdang Bedagai' },
        { text: 'Simalungun', value: 'Simalungun' },
        { text: 'Tapanuli Selatan', value: 'Tapanuli Selatan' },
        { text: 'Tapanuli Tengah', value: 'Tapanuli Tengah' },
        { text: 'Tapanuli Utara', value: 'Tapanuli Utara' },
        { text: 'Toba', value: 'Toba' },
        { text: 'Binjai', value: 'Binjai' },
        { text: 'Gunungsitoli', value: 'Gunungsitoli' },
        { text: 'Medan', value: 'Medan' },
        { text: 'Padangsidempuan', value: 'Padangsidempuan' },
        { text: 'Pematangsiantar', value: 'Pematangsiantar' },
        { text: 'Sibolga', value: 'Sibolga' },
        { text: 'Tanjungbalai', value: 'Tanjungbalai' },
        { text: 'Tebing Tinggi', value: 'Tebing Tinggi' },
      ],
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
    ...mapActions(['setTourGuideBySku', 'getTourGuideBySku', 'getTourGuideData']),
    getValidationState,

    submitTourGuide() {
      const data = { ...this.tourGuide };

      if (data.name === ''
          || data.image === null
          || data.age === 0
          || data.occupation === ''
          || data.location === ''
          || data.language === []
          || data.availableLocation === []
          || data.phone === ''
          || data.email === ''
          || data.whatsapp === ''
          || data.experience === ''
          || data.description === '') {
        return;
      }

      if (this.title === 'Add') {
        api.PostTourGuide(data)
          .then((res) => {
            if (!res.error) {
              setAlert('added tour guide', true);
              this.getTourGuideData();
              return;
            }
            setAlert('add tour guide', false);
            console.log(res);
          })
          .catch((err) => {
            setAlert('add tour guide', false);
            console.log(err);
          });

        return;
      }

      api.EditTourGuide(this.$route.params.sku, data)
        .then((res) => {
          if (!res.error) {
            setAlert('updated tour guide', true);
            return;
          }
          setAlert('update tour guide', false);
        })
        .catch((err) => {
          setAlert('update tour guide', false);
          console.log(err);
        });
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.tourGuide.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
            setAlert('to show tour guide', false);
          });
      }
    },

    removePhoto() {
      this.tourGuide.image = null;
    },

    locationSuggestions() {
      if (this.tourGuide.location) {
        api.GetSearchLocationResult(this.tourGuide.location)
          .then((res) => {
            this.locationList = res.map((item) => item.display_name);
            console.log(this.tourGuide.location, this.locationList);
          })
          .catch((err) => {
            console.log(err);
            this.locationList = null;
          });
      }
    },
  },
  watch: {
    tourGuideData() {
      if (this.tourGuideData && this.tourGuideData.sku) {
        this.tourGuide = { ...this.tourGuideData };
        this.tourGuide.image = this.imageUrl;
        this.tourGuide.language = this.tourGuideData.language.split(',');
        this.tourGuide.availableLocation = this.tourGuideData.availableLocation.split(',');
      }
    },
  },
};
</script>
