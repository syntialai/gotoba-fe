<template>
  <div class="notification-detail">
    <NavigationBack title="Notification Detail" />

    <div class="notification-card">
      <CardInfoDetail v-bind="detail" />
    </div>
  </div>
</template>

<script>
import NavigationBack from '@/components/NavigationBack.vue';
import CardInfoDetail from '@/components/CardInfoDetail.vue';

export default {
  name: 'NotificationDetail',
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
      },
    };
  },
};
</script>
