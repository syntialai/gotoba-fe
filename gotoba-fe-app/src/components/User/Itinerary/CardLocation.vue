<template>
  <div class="card-location my-2">
    <div class="d-flex">
      <div class="icon">
        <font-awesome-icon
          class="icon-gradient"
          icon="dot-circle"
        ></font-awesome-icon>
      </div>
      <div class="location">
        <div class="location__title semibold font-size-14">
          {{ name }}
        </div>
        <div class="mt-1 location__address font-size-14">
          {{ address }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardLocation',
  props: {
    name: String,
    address: String,
  },
};
</script>
