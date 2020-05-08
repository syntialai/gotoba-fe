<template>
  <div class="card-notification">
    <b-card
      class="d-flex"
      style="max-width: 768px;"
      :img-src="image"
      :img-alt="name"
      img-left
    >
      <b-card-body class="py-0">
        <b-card-title class="font-color-black-87">
          {{ title }}
        </b-card-title>
        <b-card-text class="font-color-black-60">
          {{ info }}
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'CardNotification',
  props: {
    title: String,
    image: String,
    info: String,
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 48px;

  @media screen and (min-width: 425px) {
    width: 60px;
  }

  @media screen and (min-width: 768px) {
    width: 75px;
  }
}
</style>
