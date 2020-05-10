<template>
  <div class="gallery-card box-shadow">
    <b-card
      :img-src="image"
      :img-alt="info"
      img-top
      class="p-2"
    >
      <b-card-text class="align-center bold">
        {{ info }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'GalleryCard',
  props: {
    image: String,
    info: String,
  },
};
</script>
