<template>
  <div class="user-profile m-3 p-4 bg-white box-shadow position-relative border-square-10">
    <b-media vertical-align="center">
      <template v-slot:aside>
        <b-avatar
          :src="image"
          size="64"
          class="bg-color-gray"
        ></b-avatar>
      </template>
      <div class="user-info d-flex align-items-center">
        <div class="user-name font-size-20 bold font-color-black-87">
          {{ name }}
        </div>
        <!-- <div class="user-location">{{ user.address }}</div> -->
      </div>
    </b-media>
  </div>
</template>

<script>
export default {
  name: 'CardProfileUser',
  props: {
    name: String,
    image: String,
  },
};
</script>
