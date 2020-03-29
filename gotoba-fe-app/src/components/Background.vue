<template>
  <div class="bg-curve position-absolute">
    <svg id="curve-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400.13 238.04">
      <path id="Path_59" data-name="Path 59"
        d="M32.87-1013.173s363.277-239.759,
        756.827,0,643.3,0,643.3,0v131.481H32.87Z"
        transform="translate(-32.87 1119.733)" fill="#23cce6" />
    </svg>
  </div>
</template>

<style lang="scss">
@import "~@/assets/scss/abstracts/variables";

body, .bg-curve {
  margin: 0;
  padding: 0;
}

.bg-curve {
  position: relative;
  top: 0;
  background: $blue-gradient;
  width: 768px;
  height: 205px;
}

@media screen and (max-width: 768px) {
  .bg-curve {
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  .bg-curve {
    margin: 0 auto;
  }
}

#curve-svg {
  position: absolute;
  bottom: 0;
  width: 100%;
}

#curve-svg path {
  fill: white;
}
</style>
