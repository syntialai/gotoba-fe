<template>
  <div class="gallery">
    <NavigationBack title="Gallery" />

    <Gallery />
  </div>
</template>

<script>
import NavigationBack from '@/components/Partial/NavigationBack.vue';
import Gallery from '@/components/User/Home/Gallery.vue';

export default {
  name: 'Gallery',
  components: {
    Gallery,
    NavigationBack,
  },
};
</script>