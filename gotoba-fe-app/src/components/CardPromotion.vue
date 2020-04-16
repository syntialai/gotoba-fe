<template>
  <div class="card-promotion">
    <a :href="'/' + route + '/' + sku">
      <b-card
        :img-src="imageSrc"
        :img-alt="'image' + sku"
        img-left
        class="mb-3 border-square-5"
      >
        <b-card-sub-title class="font-color-black-87">
          {{ title }}
        </b-card-sub-title>
        <b-card-text>
          {{ info }}
        </b-card-text>
      </b-card>
    </a>
  </div>
</template>

<script>
export default {
  name: 'CardPromotion',
  props: {
    route: String,
    sku: String,
    imageSrc: String,
    title: String,
    info: String,
  },
};
</script>
