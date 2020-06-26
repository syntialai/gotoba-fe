<template>
  <div class="add-tour-guide">
    <b-modal
      id="add-tour-guide-modal"
      :title="title + ' Tour Guide'"
      title-class="font-size-24"
      centered
      size="sm"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <b-form @submit="submitTourGuide">
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
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="tour-guide-born-date-group"
          label="Born Date"
          label-for="tour-guide-born-date"
        >
          <b-form-datepicker
            id="tour-guide-born-date"
            v-model="tourGuide.bornDate"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group
          id="tour-guide-gender-group"
          label="Gender"
          label-for="tour-guide-gender"
        >
          <b-form-select
            id="tour-guide-gender"
            v-model="tourGuide.gender"
          >
            <b-form-select-option value="female">Female</b-form-select-option>
            <b-form-select-option value="male">Male</b-form-select-option>
            <b-form-select-option value="other">Other</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="tour-guide-born-date-group"
          label="Born Date"
          label-for="tour-guide-born-date"
        >
          <b-form-datepicker
            id="tour-guide-born-date"
            v-model="tourGuide.bornDate"
            required
          ></b-form-datepicker>
        </b-form-group>

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
          ></b-form-input>
        </b-form-group>

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
          ></b-form-select>
        </b-form-group>

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
          ></b-form-tags>
        </b-form-group>

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
          ></b-form-select>
        </b-form-group>

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
          ></b-form-input>
        </b-form-group>

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
          ></b-form-input>
        </b-form-group>

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
          ></b-form-input>
        </b-form-group>

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
    </b-modal>
  </div>
</template>

<script>
import api from '../../../api/api';

export default {
  name: 'TourGuideModal',
  data() {
    return {
      tourGuide: {
        name: '',
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
    submitTourGuide() {
      const data = this.tourGuide;

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
  },
};
</script>
