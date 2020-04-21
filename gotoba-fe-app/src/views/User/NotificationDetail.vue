<template>
  <div class="notification-detail">
    <NavigationBack title="Notification Detail" />

    <div class="notification-card">
      <CardInfoDetail v-bind="detail" />
    </div>
  </div>
</template>

<script>
import NavigationBack from '@/components/Partial/NavigationBack.vue';
import CardInfoDetail from '@/components/User/CardInfoDetail.vue';

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
