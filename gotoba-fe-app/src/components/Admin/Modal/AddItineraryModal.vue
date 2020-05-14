<template>
  <div class="add-itinerary">
    <b-modal
      id="add-itinerary-modal"
      title="Add Itinerary"
      title-class="font-size-24"
      centered
      size="sm"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <b-form @submit="submitItinerary">
        <b-form-group
          id="itinerary-title-group"
          label="Title"
          label-for="itinerary-title"
        >
          <b-form-input
            id="itinerary-title"
            v-model="itinerary.title"
            type="text"
            class="border-gray"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="itinerary-file-group"
          label="Photo"
          label-for="itinerary-file"
        >
          <b-form-file
            id="itinerary-file"
            v-model="itinerary.file"
            required
            plain
          ></b-form-file>
        </b-form-group>

        <b-form-group
          id="itinerary-location-group"
          label="Location"
          label-for="itinerary-location"
        >
          <b-form-input
            id="itinerary-location"
            v-model="itinerary.location"
            type="text"
            class="border-gray"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="itinerary-price-group"
          label="Price"
          label-for="itinerary-price"
        >
          <b-form-input
            id="itinerary-price"
            v-model="itinerary.price"
            type="text"
            class="border-gray"
            @input="formatPrice(itinerary.price)"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="itinerary-description-group"
          label="Description"
          label-for="itinerary-description"
        >
          <b-form-textarea
            id="itinerary-description"
            v-model="itinerary.description"
            rows="5"
            max-rows="6"
            class="border-gray"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { formatPrice } from '../../../utils/filter';

export default {
  name: 'AddItineraryModal',
  data() {
    return {
      itinerary: {
        title: '',
        file: null,
        location: '',
        price: 0.0,
        description: '',
      },
    };
  },
  methods: {
    formatPrice,
    submitItinerary() {
      this.$store.commit('addItinerary', this.itinerary);
    },
  },
};
</script>
