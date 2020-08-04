<template>
  <div class="rating d-flex align-items-center">
    <full-star
      v-for="i in rating"
      :key="i"
      color="yellow"
      :fontSize="fontSize"
    ></full-star>
    <half-star v-if="rate - parseInt(rate, 10) > 0"></half-star>
    <full-star
      v-for="i in (5 - ceilRating)"
      :key="i"
      color="gray-young"
    ></full-star>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    rate: Number,
    fontSize: {
      type: Number,
      default: 16,
    },
  },
  components: {
    'half-star': {
      name: 'halfStar',
      props: {
        fontSize: {
          type: Number,
          default: 16,
        },
      },
      template: `
        <font-awesome-layers
          :class="['fa-stack p-0 font-size-' + fontSize]"
        >
          <font-awesome-icon icon="star" class="icon-gray fa-stack-1x m-0" />
          <font-awesome-icon 
            icon="star-half"
            class="fa-inverse icon-yellow fa-stack-1x m-0"
            transform="shrink-2" />
        </font-awesome-layers>
      `,
    },
    'full-star': {
      name: 'fullStar',
      props: {
        color: String,
        fontSize: {
          type: Number,
          default: 16,
        },
      },
      template: `
        <font-awesome-icon 
          icon="star" 
          :class="['icon-' + color + ' font-size-' + fontSize]" 
        />
      `,
    },
  },
  computed: {
    rating() {
      return parseInt(this.rate, 10);
    },
    ceilRating() {
      return Math.ceil(this.rate);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/index';

.fa-stack {
  width: 1em;
  height: 1em;
}
</style>
