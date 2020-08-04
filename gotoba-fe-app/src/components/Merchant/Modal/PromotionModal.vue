<template>
  <div class="promotion-modal">
    <b-modal
      id="add-promotion-modal"
      :title="title + ' Promotion'"
      title-class="font-size-24"
      centered
      size="sm"
      @ok="submitPromotion"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <ValidationObserver>
        <b-form @submit.stop.prevent="submitPromotion">
          <ValidationProvider
            name="Title"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="promotion-title-group"
              label="Title"
              label-for="promotion-title"
            >
              <b-form-input
                id="promotion-title"
                v-model="promotion.title"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="promotion-title-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="promotion-title-feedback-msg">
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
              id="promotion-image-group"
              label="Photo"
              label-for="promotion-image"
            >
              <div v-if="promotion.image === null">
                <b-form-file
                  id="promotion-image"
                  v-model="promotion.image"
                  @change="loadImage"
                  accept="image/jpeg, image/jpg, image/png"
                  required
                  plain
                  :state="getValidationState(validationContext)"
                  aria-describedby="promotion-image-feedback-msg"
                ></b-form-file>
                <b-form-invalid-feedback id="promotion-image-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </div>
              <div v-else>
                <b-img :src="promotion.image" center :width="100"></b-img>
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
            rules="required|alpha_dash"
            v-slot="validationContext"
          >
            <b-form-group
              id="promotion-category-group"
              label="Category"
              label-for="promotion-category"
            >
              <b-form-input
                id="promotion-category"
                v-model="promotion.category"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="promotion-category-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="promotion-category-feedback-msg">
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
              id="promotion-price-group"
              label="Price"
              label-for="promotion-price"
            >
              <b-form-input
                id="promotion-price"
                v-model="promotion.price"
                :formatter="formatPrice"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="promotion-price-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="promotion-price-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Discount"
            :rules="{ required: true, numeric: true, min_value: 0 }"
            v-slot="validationContext"
          >
            <b-form-group
              id="promotion-discount-group"
              label="Discount"
              label-for="promotion-discount"
            >
              <b-form-input
                id="promotion-discount"
                v-model="promotion.discount"
                @input="formatPrice(promotion.discount)"
                type="text"
                class="border-gray"
                required
                :state="getValidationState(validationContext)"
                aria-describedby="promotion-discount-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="promotion-discount-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Expired Date"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="promotion-expired-date"
              label="Expired date"
              label-for="input-expired-date"
            >
              <b-form-datepicker
                id="input-expired-date"
                v-model="promotion.expiredDate"
                :date-format-options="{ year: 'numeric', month: 'long', day: 'numeric' }"
                :state="getValidationState(validationContext)"
                aria-describedby="promotion-expired-date-feedback-msg"
              ></b-form-datepicker>
              <b-form-invalid-feedback id="promotion-expired-date-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Description"
            rules="required|min:25"
            v-slot="validationContext"
          >
            <b-form-group
              id="promotion-description-group"
              label="Description"
              label-for="promotion-description"
            >
              <b-form-textarea
                id="promotion-description"
                v-model="promotion.description"
                rows="5"
                max-rows="6"
                class="border-gray"
                :state="getValidationState(validationContext)"
                aria-describedby="promotion-description-feedback-msg"
              ></b-form-textarea>
              <b-form-invalid-feedback id="promotion-description-feedback-msg">
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
import { mapGetters, mapActions } from 'vuex';
import getValidationState from '../../../utils/validation';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'PromotionModal',
  computed: {
    ...mapGetters(['ticketData']),
  },
  created() {
    if (this.title === 'Edit') {
      this.getTicketBySku(this.$route.params.sku);
    } else {
      this.setTicketBySku({});
    }
  },
  data() {
    return {
      promotion: {
        title: '',
        description: '',
        category: '',
        image: null,
        price: 0,
        discount: 0,
        expiredDate: '',
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
    ...mapActions(['setTicketBySku', 'getTicketBySku']),

    getValidationState,

    submitPromotion() {
      const data = { ...this.promotion };

      if (data.title === ''
      || data.description === ''
      || data.category === ''
      || data.image === null
      || data.price <= 0
      || data.discount < 0
      || data.expiredDate === '') {
        return;
      }

      if (this.title === 'Add') {
        api.PostTicket(this.userInfo.sku, data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      api.EditTicket(this.userInfo.sku, data)
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
            this.promotion.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    removePhoto() {
      this.promotion.image = null;
    },
  },
  mounted() {
    this.promotion = { ...this.ticketData };
  },
};
</script>
