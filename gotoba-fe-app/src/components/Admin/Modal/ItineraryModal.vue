<template>
  <div class="add-itinerary">
    <b-modal
      id="add-itinerary-modal"
      :title="title + ' Itinerary'"
      title-class="font-size-24"
      centered
      size="sm"
      @ok="submitItinerary"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <b-form @submit.stop.prevent="submitItinerary">
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
          <div v-if="itinerary.image === null">
            <b-form-file
              id="itinerary-image"
              v-model="itinerary.image"
              @change="loadImage"
              accept="image/jpeg, image/jpg, image/png"
              required
              plain
            ></b-form-file>
          </div>
          <div v-else>
            <b-img :src="itinerary.image" center :width="100"></b-img>
            <b-button
              size="sm"
              class="custom-btn-gray mt-2"
              @click="removePhoto"
            >Remove photo</b-button>
          </div>
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
            @input="formatPrice(itinerary.price)"
            type="text"
            class="border-gray"
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
import { mapGetters } from 'vuex';
import { formatPrice } from '../../../utils/filter';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'ItineraryModal',
  computed: {
    ...mapGetters(['journeyData']),
  },
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

      if (data.title === '' || data.image === null || data.description === '') {
        return;
      }

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
    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.itinerary.image = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    removePhoto() {
      this.itinerary.image = null;
    },
  },
};
</script>
