<template>
  <div class="notification-detail">
    <div class="notification-card">
      <card-info-detail v-bind="detail" />
    </div>
  </div>
</template>

<script>
import CardInfoDetail from '../../../components/User/CardInfoDetail.vue';

export default {
  name: 'NotificationDetail',
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
