<template>
  <div class="notification-detail">
    <NavigationBack title="Notification Detail" />

    <div class="notification-card">
      <b-card
        :img-src="image"
        :img-alt="['Image' + title.substring(1,20).replace(' ', '-')]"
        class="w-100"
        img-top
      >
        <b-card-title>
          {{ title }}
        </b-card-title>
        <b-card-text>
          {{ info }}
        </b-card-text>
        <!-- <template v-slot:footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template> -->
      </b-card>
    </div>
  </div>
</template>

<script>
import NavigationBack from '@/components/NavigationBack.vue';

export default {
  name: 'NotificationDetail',
  components: {
    NavigationBack,
  },
  props: {
    title: String,
    image: String,
    info: String,
  },
};
</script>
