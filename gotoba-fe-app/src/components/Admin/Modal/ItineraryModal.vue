<template>
  <div class="add-itinerary">
    <b-modal
      id="add-itinerary-modal"
      :title="title + ' Itinerary'"
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
          id="itinerary-image-group"
          label="Photo"
          label-for="itinerary-image"
        >
          <b-form-file
            id="itinerary-image"
            v-model="itinerary.image"
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
import api from '../../../api/api';

export default {
  name: 'ItineraryModal',
  data() {
    return {
      itinerary: {
        title: '',
        image: null,
        location: '',
        price: 0.0,
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
    formatPrice,
    submitItinerary() {
      const data = {
        title: this.itinerary.title,
        image: this.itinerary.image,
        description: this.itinerary.description,
      };

      if (this.title === 'Add') {
        api.PostItinerary(data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      api.EditItinerary(this.itinerary.sku, data)
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
