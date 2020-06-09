<template>
  <div class="card-review-product">
    <b-card
      :img-src="image"
      :img-alt="name"
      img-left
      img-height="80"
      img-width="80"
    >
      <b-card-text>
        {{ name }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'CardReviewProduct',
  props: {
    image: String,
    name: String,
  },
};
</script>
