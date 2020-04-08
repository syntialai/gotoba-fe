<template>
  <div class="search">
    <SearchNavigation class="mb-1" />

    <SearchContent
      title="Your History"
      :keywords='history'
      v-if="history.length > 0"
      class="mt-3 mb-3"
    />

    <SearchContent
      title="Recommendation"
      :keywords='recommendation'
      class="mt-3"
    />
  </div>
</template>

<script>
import SearchNavigation from '@/components/SearchNavigation.vue';
import SearchContent from '@/components/SearchContent.vue';

export default {
  name: 'Search',
  components: {
    SearchNavigation,
    SearchContent,
  },
  data() {
    return {
      history: [],
      recommendation: ['Toba', 'Lake Toba'],
    };
  },
};
</script>
