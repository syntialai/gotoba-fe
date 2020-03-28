<template>
  <section class="curve-section">
    <svg id="curve-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400.13 238.04">
      <path id="Path_59" data-name="Path 59" d="M32.87-1013.173s363.277-239.759,756.827,0,643.3,0,643.3,0v131.481H32.87Z" transform="translate(-32.87 1119.733)" fill="#23cce6"/>
    </svg>
  </section>
</template>

<style lang="scss" scoped>
body, section {
  margin: 0;
  padding: 0;
}

.curve-section {
  position: relative;
  background: $blue-gradient;
  width: 100%;
  height: 50vh;
}

#curve-svg {
  position: absolute;
  bottom: 0;
  width: 100%;
}

#curve-svg path {
  fill: #efefef;
}
</style>
