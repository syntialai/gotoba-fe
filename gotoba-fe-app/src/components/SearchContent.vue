<template>
  <div class="search-content">
    <div class="p-3">
      <div class="title font-color-blue-primary mb-2">
        <h6>{{ title }}</h6>
      </div>
      <div class="mt-1">
        <b-button
          variant="outline-secondary"
          v-for="item in keywords"
          :key="item.match(/[^\s]/g).join('')"
          :href="['/search?q=' + item.join('+')]"
          class="border-rounded"
        >
          {{ item }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchContent',
  props: {
    title: String,
    keywords: Array,
  },
};
</script>
