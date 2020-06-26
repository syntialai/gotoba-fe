<template>
  <div class="error min-vh-100 pt-3">
    <b-img
      center
      src="@/assets/img/illustrate/404.png"
      alt="404 Not Found"
      width="240"
      class="mt-5 pt-4"
    ></b-img>

    <slot />
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>
