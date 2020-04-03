<template>
  <div class="items">
    <b-card no-body class="overflow-hidden" style="max-width: 768px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            :src="image"
            class="border-rounded"
            :alt="['IMG-'+name.replace(' ', '-')]"
          >
          </b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-title class="font-color-black-87">
              {{ name }}
            </b-card-title>
            <b-card-text>
              <span
                :class="['normal-price font-color-black-60 ' + { strikethrough: discount }]"
              >
                {{ format(price) }}
              </span>
              <span v-if="discount" class="discount-price font-color-red semibold">
                {{ format(discountPrice) }}
              </span>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Order Items',
  props: {
    name: String,
    image: String,
    price: String,
    discountPrice: '0',
  },
  data() {
    return {
      discount: discountPrice != '0',
    };
  },
  method: {
    format(price) {
      return new Intl.NumberFormat('id').format(parseInt(price));
    },
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
