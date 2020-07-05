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
      <b-form @submit.stop.prevent="submitPromotion">
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
          ></b-form-input>
        </b-form-group>

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
            ></b-form-file>
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
          ></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import previewImage from '../../../utils/fileHelper';

export default {
  name: 'PromotionModal',
  data() {
    return {
      promotion: {
        title: '',
        image: null,
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
    submitPromotion() {
      const data = { ...this.promotion };

      console.log(data);
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.promotion.image = res;
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
};
</script>
