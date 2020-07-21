<template>
  <div class="card-ticket bg-white w-100">
    <b-card class="m-2 d-flex">
      <b-card-img
        :src="imageUrl"
        :alt="'image-' + ticket.title"
        class="ml-1 mr-3 border-circle"
      ></b-card-img>
      <b-card-text class="font-size-12">
        <div class="title semibold mb-1">
          {{ ticket.title }}
        </div>
        <div class="merchant font-color-blue-secondary mb-2">
          <a href="">{{ ticket.merchant }}</a>
        </div>
        <div class="valid">
          <div v-if="ticket.expiredDate <= Date.now" class="font-color-red">
            Expired on {{ ticket.expiredDate }}
          </div>
          <div else class="font-color-gray">
            Valid until {{ ticket.expiredDate }}
          </div>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import api from '../../../api/api';

export default {
  name: 'CardTicket',
  props: {
    ticket: Object,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.ticket.image);
    },
  },
};
</script>
