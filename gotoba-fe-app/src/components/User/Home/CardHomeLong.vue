<template>
  <router-link :to="goToTicketDetails">
    <div class="card-home-long bg-white box-shadow mb-3">
      <div class="d-flex p-3">
        <div class="image">
          <b-img :src="imageUrl" :alt="data.sku" width="150" height="100" />
        </div>
        <div class="card-home__info pl-3">
          <div class="item__name font-color-black-87 semibold d-block">
            {{ data.title }}
          </div>
          <div class="font-size-14 d-block mb-1 font-color-black-60">
            {{ data.description }}
          </div>
          <div class="font-color-black-60">Valid until : </div>
          <div class="date font-color-black-87 pb-3">{{ date }}</div>
        </div>
      </div>
    </div>
  </router-link>
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
      console.log(this.data.expiredDate);
      const dateArray = formatDate(new Date(this.data.expiredDate)).split(' ');
      dateArray.shift();
      return dateArray.join(' ');
    },
    goToTicketDetails() {
      return `/ticket/${this.data.sku}`;
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
</style>
