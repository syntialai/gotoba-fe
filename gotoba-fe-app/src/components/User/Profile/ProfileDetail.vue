<template>
  <div class="profile-detail" v-if="data">
    <card-profile-detail
      class="mb-2 mt-2"
      v-bind="data"
      :add="isMerchant"
    />

    <about-profile-detail
      class="mb-2"
      :data="data"
    />

    <div class="promotion mb-2 bg-white p-3" v-if="promotions.length > 0">
      <div class="title d-flex justify-content-between border-bottom-gray-young mb-3">
        <h5>Promotions</h5>
        <div class="add" v-if="isMerchant">
          <b-button
            variant="link"
            @click="openModal"
          >Add</b-button>
        </div>
      </div>
      <div class="promotion-group">
        <card-promotion
          v-for="promo in promotions"
          :key="promo.sku"
          v-bind="promo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardProfileDetail from './CardProfileDetail.vue';
import AboutProfileDetail from './AboutProfileDetail.vue';
import CardPromotion from '../CardPromotion.vue';

export default {
  name: 'ProfileDetail',
  components: {
    CardProfileDetail,
    AboutProfileDetail,
    CardPromotion,
  },
  props: {
    data: Object,
    promotions: Array,
  },
  computed: {
    ...mapGetters(['userRole']),
    isMerchant() {
      return this.userRole === 'ROLE_MERCHANT';
    },
  },
};
</script>
