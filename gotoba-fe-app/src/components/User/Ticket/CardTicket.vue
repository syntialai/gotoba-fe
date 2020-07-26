<template>
  <div class="card-ticket bg-white w-100">
    <router-link :to="goToQRCode">
      <b-card class="m-2 d-flex">
        <b-card-img
          :src="imageUrl"
          :alt="'image-' + ticket.title"
          class="border-circle"
          left
        ></b-card-img>
        <b-card-text class="m-2">
          <div class="title semibold font-size-14">
            {{ ticket.title }}
          </div>
          <div class="valid font-size-12">
            <div v-if="isExpired" class="font-color-red">
              Expired on {{ expiredDate }}
            </div>
            <div else class="font-color-gray">
              Valid until {{ expiredDate }}
            </div>
          </div>
        </b-card-text>
      </b-card>
    </router-link>
  </div>
</template>

<script>
import { isPassed, formatDate } from '../../../utils/filter';
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
    isExpired() {
      return isPassed(new Date(this.ticket.expiredDate));
    },
    goToQRCode() {
      return `/my-tickets/${this.ticket.sku}`;
    },
    expiredDate() {
      const date = formatDate(new Date(this.ticket.expiredDate)).split(' ');
      date.shift();
      return date.join(' ');
    },
  },
};
</script>
