<template>
  <div class="background position-absolute">
    <svg id="curve-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400.13 238.04">
      <path id="Path_59" data-name="Path 59"
        d="M32.87-1013.173s363.277-239.759,
        756.827,0,643.3,0,643.3,0v131.481H32.87Z"
        transform="translate(-32.87 1119.733)" fill="#23cce6" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BackgroundImage',
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/abstracts/variables";

body, .background {
  margin: 0 auto;
  padding: 0;
}

.background {
  position: relative;
  top: 0;
  background: $blue-gradient-50, url('../../assets/img/toba/danau-toba.jpg');
  background-size: cover;
  background-position: center bottom;
  width: 100%;
  max-width: 1000px;
  height: 40%;
}

@media screen and (min-width: 768px) {
  .background {
    height: 50%;
  }
}

#curve-svg {
  position: absolute!important;
  bottom: 0!important;
  width: 100%!important;
  fill: $bg-color!important;
}

#curve-svg path {
  fill: $bg-color!important;
  width: 100%!important;
}
</style>
