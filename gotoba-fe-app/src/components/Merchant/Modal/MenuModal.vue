<template>
  <div class="menu-modal">
    <b-modal
      id="add-menu-modal"
      :title="title + ' Restaurant Menu'"
      title-class="font-size-24"
      centered
      size="sm"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <ValidationObserver>
        <b-form @submit.stop.prevent="submitMenu">
          <ValidationProvider
            name="Name"
            rules="required|alpha_dash"
            v-slot="validationContext"
          >
            <b-form-group
              id="menu-name-group"
              label="Name"
              label-for="menu-name"
            >
              <b-form-input
                id="menu-name"
                v-model="menu.name"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-name-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="itinerary-name-feedback-msg">
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
              id="menu-image-group"
              label="Photo"
              label-for="menu-image"
            >
              <div v-if="menu.image === null">
                <b-form-file
                  id="menu-image"
                  v-model="menu.image"
                  @change="loadImage"
                  accept="image/jpeg, image/jpg, image/png"
                  required
                  plain
                  :state="getValidationState(validationContext)"
                  aria-describedby="itinerary-image-feedback-msg"
                ></b-form-file>
                <b-form-invalid-feedback id="itinerary-image-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </div>
              <div v-else>
                <b-img :src="menu.image" center :width="100"></b-img>
                <b-button
                  size="sm"
                  class="custom-btn-gray mt-2"
                  @click="removePhoto"
                >Remove photo</b-button>
              </div>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Category"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="menu-category-group"
              label="Category"
              label-for="menu-category"
            >
              <b-form-select
                v-model="menu.category"
                :options="categoryOptions"
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-category-feedback-msg"
              ></b-form-select>
              <b-form-invalid-feedback id="itinerary-category-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Price"
            :rules="{ required: true, numeric: true, min_value: 1000 }"
            v-slot="validationContext"
          >
            <b-form-group
              id="menu-price-group"
              label="Price"
              label-for="menu-price"
            >
              <b-form-input
                id="menu-price"
                v-model="menu.price"
                :formatter="formatPrice"
                type="text"
                required
                class="border-gray"
                :state="getValidationState(validationContext)"
                aria-describedby="itinerary-price-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="itinerary-price-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatPrice } from '../../../utils/filter';
import getValidationState from '../../../utils/validation';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'MenuModal',
  computed: {
    ...mapGetters(['restaurantMenu']),
  },
  props: {
    title: {
      type: String,
      default: 'Add',
    },
  },
  data() {
    return {
      menu: {
        name: '',
        image: null,
        category: '',
        price: 0.0,
      },
    };
  },
  methods: {
    formatPrice,

    getValidationState,
    
    submitMenu() {
      const data = { ...this.menu };

      if (
        data.name === ''
        || data.image === null
        || data.category === ''
        || data.price <= 0
      ) {
        return;
      }

      if (this.title === 'Add') {
        api.AddRestaurantMenu(this.$route.params.sku, data)
          .then((res) => {
            console.log(res);
            this.$route.push('/merchant/bistro');
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      api.EditRestaurantMenu(this.$route.params.sku, this.$route.params.id, data)
        .then((res) => {
          console.log(res);
          this.$route.push('/merchant/bistro');
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
            this.menu.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    removePhoto() {
      this.menu.image = null;
    },
  },
};
</script>
