<template>
  <div class="promotion-detail">
    <div class="promotion-card">
      <card-info-detail v-bind="detail" />
    </div>
  </div>
</template>

<script>
import CardInfoDetail from '../../../components/User/CardInfoDetail.vue';

export default {
  name: 'PromotionDetail',
  components: {
    CardInfoDetail,
  },
  data() {
    return {
      detail: {
        title: 'String',
        image: 'String',
        info: 'String',
      },
    };
  },
};
</script>
