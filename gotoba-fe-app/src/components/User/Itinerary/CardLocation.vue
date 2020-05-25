<template>
  <div class="card-location">
    <div class="d-flex">
      <div class="icon">
        <font-awesome-icon
          class="icon-gradient"
          icon="dot-circle"
          size="2x"
        ></font-awesome-icon>
      </div>
      <div class="location">
        <div class="location__title bold">
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
