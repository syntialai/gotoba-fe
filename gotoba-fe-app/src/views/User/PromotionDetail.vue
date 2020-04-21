<template>
  <div class="promotion-detail">
    <NavigationBack title="Promotion Detail" />

    <div class="promotion-card">
      <CardInfoDetail v-bind="detail" />
    </div>
  </div>
</template>

<script>
import NavigationBack from '@/components/Partial/NavigationBack.vue';
import CardInfoDetail from '@/components/User/CardInfoDetail.vue';

export default {
  name: 'PromotionDetail',
  components: {
    NavigationBack,
    CardInfoDetail,
  },
  data() {
    return {
      detail: {
        title: 'String',
        image: 'String',
        info: 'String',
      }
    };
  },
};
</script>
