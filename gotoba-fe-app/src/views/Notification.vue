<template>
  <div class="notification">
    <NavigationBack title="Notification" />

    <div class="notification-group">
      <CardNotification
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
import NavigationBack from '@/components/NavigationBack.vue';
import CardNotification from '@/components/CardNotification.vue';

export default {
  name: 'Notification',
  components: {
    NavigationBack,
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
