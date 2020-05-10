<template>
  <div class="notification">
    <div class="notification-group p-3">
      <card-notification
        v-for="item in notifications"
        :key="item.title"
        :title="item.title"
        :image="item.image"
        :info="item.info"
      />
    </div>
  </div>
</template>

<script>
import CardNotification from '../../../components/User/Notification/CardNotification.vue';

export default {
  name: 'Notification',
  components: {
    CardNotification,
  },
  data() {
    return {
      notifications: [
        {
          title: 'E-ticket', image: 'image-notif-1', info: 'ini notifikasi',
        },
      ],
    };
  },
};
</script>
