<template>
  <div class="card-info-detail">
    <b-card
      :img-src="image"
      :img-alt="['Image-' + title]"
      class="w-100"
      img-top
    >
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
