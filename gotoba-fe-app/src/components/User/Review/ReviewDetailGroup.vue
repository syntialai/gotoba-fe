<template>
  <div class="review-detail">
    <card-profile-detail
      class="mb-2 mt-2"
      v-bind="data"
    />

    <div class="nav-by-rating w-100 mb-3 border-bottom-gray-young">
      <b-nav justified pills>
        <b-nav-item
          v-for="i in 5"
          :key="5 - i"
          href=""
        >
          <span>{{ i }}</span>
          <font-awesome-icon :icon="['fas', 'whatsapp']" />
        </b-nav-item>
      </b-nav>
    </div>

    <div id="user-review-group">
      <user-review-detail
        v-for="review in data.reviews"
        :key="review.userName"
        v-bind="review"
      />
    </div>

    <pagination
      idControls="user-review-group"
      :currentPage="1"
      :perPage="5"
    />
  </div>
</template>

<script>
import CardProfileDetail from './Profile/CardProfileDetail.vue';
import Pagination from '../Partial/Pagination.vue';
import UserReviewDetail from '../Review/UserReviewDetail.vue';

export default {
  name: 'ReviewDetailGroup',
  props: {
    data: Object,
  },
  components: {
    CardProfileDetail,
    Pagination,
    UserReviewDetail,
  },
};
</script>
