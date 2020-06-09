<template>
  <div class="review">
    <div class="info p-4">
      How would you rate this {{ category }} experience?
    </div>

    <card-review-product name="" image="" />

    <b-form-rating
      v-model="rating"
      variant="warning"
      class="p-3"
      required
      no-border
    ></b-form-rating>

    <b-form-group
      v-if="rate > 0"
      id="review-comment-group"
      label="Any comments?"
      label-for="input-review-comment"
    >
      <b-form-textarea
        id="input-review-comment"
        v-model="comment"
      ></b-form-textarea>
    </b-form-group>

    <b-button
      type="submit"
      block
      disabled
      class="custom-btn-primary m-3"
      @click="submitReview"
    >SUBMIT</b-button>
  </div>
</template>

<script>
import CardReviewProduct from '../../../components/User/Review/CardReviewProduct.vue';
import api from '../../../api/api';

export default {
  name: 'Review',
  components: {
    CardReviewProduct,
  },
  computed: {
    info() {
      return this.$store.getters.reviewInfo;
    },
  },
  data() {
    return {
      rating: 0,
      comment: '',
    };
  },
  method: {
    submitMethod() {
      const data = {
        rating: this.rating,
        comment: this.comment,
      };

      api.PostReview(sku, data)
        .then((res) => {
          console.log(res);
          this.$route.push('/review/thankyou');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
