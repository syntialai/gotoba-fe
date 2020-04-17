<template>
  <div class="card-ticket bg-white w-100">
    <b-card class="m-2 d-flex">
      <b-card-img
        :src="image"
        :alt="'image-' + title"
        class="ml-1 mr-3 border-circle"
      ></b-card-img>
      <b-card-text class="font-size-12">
        <div class="title semibold mb-1">
          {{ title }}
        </div>
        <div class="merchant font-color-blue-secondary mb-2">
          <a href="">{{ merchant }}</a>
        </div>
        <div class="valid">
          <div v-if="expiredDate <= Date.now" class="font-color-red">
            Expired on {{ expiredDate }}
          </div>
          <div else class="font-color-gray">
            Valid until {{ expiredDate }}
          </div>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'CardTicket',
  props: {
    title: String,
    image: String,
    merchant: String,
    expiredDate: Date,
  },
};
</script>
