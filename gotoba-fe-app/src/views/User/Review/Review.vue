<template>
  <div class="review">
    <div class="info p-4">
      How would you rate this {{ ticketData.category }} experience?
    </div>

    <card-review-product
      :name="ticketData.name"
      :image="ticketData.image"
    />

    <b-form-rating
      v-model="reviewData.rating"
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
        v-model="reviewData.comment"
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
import { mapActions, mapGetters, mapState } from 'vuex';
import CardReviewProduct from '../../../components/User/Review/CardReviewProduct.vue';
import api from '../../../api/api';

export default {
  name: 'Review',
  components: {
    CardReviewProduct,
  },
  computed: {
    ...mapGetters(['ticketData']),
    ...mapState(['reviewData']),
  },
  created() {
    this.getTicketBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getTicketBySku']),
    submitMethod() {
      const data = {
        rating: this.reviewData.rating,
        comment: this.reviewData.comment,
      };

      api.PostReview(this.$route.params.sku, data)
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
