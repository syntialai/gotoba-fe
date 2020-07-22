<template>
  <div class="card-home-long bg-white box-shadow mb-3">
    <div class="d-flex p-3">
      <b-img :src="imageUrl" :alt="data.sku" width="150" height="100" />
      <div class="card-home__info pl-3">
        <span class="item__name font-color-black-87 semibold d-block">
          {{ data.title }}
        </span>
        <span class="font-size-14 d-block mb-1">
          {{ data.description }}
        </span>
        <span class="font-color-black-60">Valid until : </span>
        <span class="date font-color-black-87pb-3">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../../utils/filter';
import api from '../../../api/api';

export default {
  name: 'CardHomeLong',
  props: {
    data: Object,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.data.image);
    },
    date() {
      const dateArray = formatDate(new Date(this.data.expiredDate)).split(' ');
      dateArray.shift();
      return dateArray.join(' ');
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 120px;
  height: 90px;

  @media screen and (min-width: 425px) {
    width: 120px;
    height: 105px;
  }

  @media screen and (min-width: 768px) {
    width: 160px;
    height: 120px;
  }
}

.card-home__info {
  height: 90px;

  @media screen and (min-width: 425px) {
    height: 105px;
  }

  @media screen and (min-width: 768px) {
    height: 120px;
  }
}
</style>
