<template>
  <div class="rating">
    <full-star
      v-for="i in parseInt(rate)"
        :key="i"
        :color="$yellow"
    ></full-star>
    <half-star v-if="rate - parseInt(rate) > 0"></half-star>
    <full-star
      v-for="i in (5 - parseInt(rate))"
        :key="i"
        :color="$gray"
    ></full-star>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    rate,
    fontSize,
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
        color,
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
