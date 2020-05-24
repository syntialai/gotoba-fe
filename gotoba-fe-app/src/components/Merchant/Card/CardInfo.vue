<template>
  <div class="card-info">
    <div class="d-flex justify-content-between w-100 m-4 bg-white box-shadow">
      <div class="w-50 align-center">
        <div
          class="value font-size-32 bold font-color-blue=primary p-4 border-right-gray-ypung"
        >
          {{ info.value1 }}
        </div>
        <div class="info">
          {{ info.info1 }}
        </div>
      </div>
      <div class="w-50 align-center">
        <div class="value font-size-32 bold font-color-blue=primary p-4">
          {{ info.value2 }}
        </div>
        <div class="info">
          {{ info.info2 }}
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
