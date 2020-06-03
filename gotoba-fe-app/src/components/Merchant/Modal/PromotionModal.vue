<template>
  <div class="promotion-modal">
    <b-modal
      id="add-promotion-modal"
      :title="title + ' Promotion'"
      title-class="font-size-24"
      centered
      size="sm"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <b-form @submit="submitPromotion">
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
          <b-form-file
            id="promotion-image"
            v-model="promotion.image"
            required
            plain
          ></b-form-file>
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
    submitPromotion() {},
  },
};
</script>
