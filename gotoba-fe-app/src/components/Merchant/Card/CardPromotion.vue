<template>
  <div class="promotion">
    <div class="promotion-card">
      <card-info-detail v-bind="detail" />
    </div>
    <div class="edit-delete-btn bg-white w-100">
      <div class="w-50 p-3">
        <b-button block class="custom-btn-red" @click="deletePromotion">
          DELETE
        </b-button>
      </div>
      <div class="w-50 p-3">
        <b-button block class="custom-btn-primary" v-b-modal.add-promotion-modal>
          EDIT
        </b-button>
      </div>
    </div>
    <promotion-modal title="Edit" />
  </div>
</template>

<script>
import CardInfoDetail from '../../User/CardInfoDetail.vue';
import PromotionModal from '../Modal/PromotionModal.vue';

export default {
  name: 'Promotion',
  components: {
    CardInfoDetail,
    PromotionModal,
  },
  props: {
    detail: Object,
  },
};
</script>
