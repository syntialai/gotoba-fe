<template>
  <div class="card-info-detail">
    <b-card class="w-100">
      <b-aspect aspect="16:9">
        <b-card-img
          :src="image"
          :alt="'Image-' + title"
          class="w-100"
          top
        ></b-card-img>
      </b-aspect>
      <b-card-title>
        {{ title }}
      </b-card-title>
      <b-card-text>
        {{ info }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'CardInfoDetail',
  props: {
    title: String,
    image: String,
    info: String,
  },
};
</script>
