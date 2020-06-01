<template>
  <div class="card-info">
    <div
      class="d-flex justify-content-between w-100 bg-white box-shadow
      position-relative border-square-10"
    >
      <div class="w-50 align-center">
        <div class="my-3 border-right-gray-young">
          <div
            class="value font-size-32 bold font-color-blue-primary"
          >
            {{ info.value1 }}
          </div>
          <div class="info">
            {{ info.info1 }}
          </div>
        </div>
      </div>
      <div class="w-50 align-center">
        <div class="my-3">
          <div class="value font-size-32 bold font-color-blue-primary">
            {{ info.value2 }}
          </div>
          <div class="info">
            {{ info.info2 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardInfo',
  props: {
    info: Object,
  },
};
</script>
