<template>
  <div class="user-profile w-100 m-4 bg-white box-shadow position-relative border-square-10">
    <b-media vertical-align="center">
      <template v-slot:aside>
        <b-avatar :src="user.image"></b-avatar>
      </template>
      <div class="user-info">
        <div class="user-name bold font-size-20">{{ user.nickname }}</div>
        <div class="user-location font-color-black-60">{{ user.address }}</div>
      </div>
    </b-media>
  </div>
</template>

<script>
export default {
  name: 'CardProfileUser',
  props: {
    user: Object,
  },
};
</script>
