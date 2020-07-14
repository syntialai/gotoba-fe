<template>
  <div class="card-home-long bg-white box-shadow mb-3">
    <div class="d-flex p-3">
      <b-img :src="data.image" :alt="data.title" />
      <div class="card-home__info pl-3">
        <span class="item__name font-color-black-87 bold d-block">
          {{ data.title }}
        </span>
        <span class="font-size-14 d-block mb-1">
          {{ data.info }}
        </span>
        <span>Valid until : </span>
        <span class="date font-color-black-87">{{ data.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardHomeLong',
  props: {
    data: Object,
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
