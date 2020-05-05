<template>
  <div class="notification">
    <div class="notification-group">
      <card-notification
        v-for="item in notifications"
        :key="item.title.match(/^[\w\s]/g).join('').substring(1,10)"
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
