<template>
  <div class="rating">
    <full-star
      v-for="i in rate"
        :key="i"
        color="yellow"
        :fontSize="fontSize"
    ></full-star>
    <half-star v-if="rate - parseInt(rate) > 0"></half-star>
    <full-star
      v-for="i in (5 - rate)"
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
      template: `
        <font-awesome-layers :class="['fa-4x font-size-' + fontSize]">
          <font-awesome-icon icon="star" class="icon-gray" />
          <font-awesome-icon 
            icon="star-half"
            class="fa-inverse icon-yellow"
            transform="shrink-6" />
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
};
</script>

<style lang="scss">
@import '@/assets/scss/index';
</style>
