<template>
  <div class="gallery-home p-3 bg-white">
    <agile
      class="main"
      ref="main"
      :options="optionsMain"
      :as-nav-for="asNavForMain"
    >
      <div
        class="slide d-flex align-items-center justify-content-center"
        v-for="(slide, index) in slides"
        :key="index"
        :class="`slide--${index}`"
      >
        <img :src="slide" alt="image-preview" />
      </div>
    </agile>
    <agile
      class="thumbnails mt-3"
      ref="thumbnails"
      :options="optionsThumbnails"
      :as-nav-for="asNavForThumbnails"
    >
      <div
        class="slide slide--thumbnail"
        v-for="(slide, index) in slides"
        :key="index"
        :class="`slide--${index} p-0 pl-1 pr-1`"
        @click="$refs.thumbnails.goTo(index)"
      >
        <img :src="slide" class="w-100 h-100" />
      </div>
    </agile>
  </div>
</template>

<script>
import { VueAgile } from 'vue-agile';
import api from '../../../api/api';

export default {
  name: 'GalleryHome',
  components: {
    agile: VueAgile,
  },
  props: {
    galleryData: Array,
  },
  computed: {
    slides() {
      return this.galleryData.map((data) => api.imageUrl(data.image));
    },
  },
  data() {
    return {
      asNavForMain: [],
      asNavForThumbnails: [],
      optionsMain: {
        dots: false,
        fade: true,
        navButtons: false,
      },

      optionsThumbnails: {
        autoplay: true,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1000,
            settings: {
              navButtons: false,
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.asNavForMain.push(this.$refs.thumbnails);
    this.asNavForThumbnails.push(this.$refs.main);
  },
};
</script>

<style lang="scss" scoped>
.thumbnails {
  width: calc(100% + 10px);
}

.slide {
  box-sizing: border-box;
  height: 200px;

  &--thumbnail {
    cursor: pointer;
    height: 80px;
    transition: opacity .3s;
  }

  &:hover {
    opacity: .75;
  }

  img {
    object-fit: cover;
    object-position: center;
  }
}

@media screen and (min-width: 425px) {
  .slide {
    height: 250px;

    &--thumbnail {
      height: 105px;
    }
  }
}

@media screen and (min-width: 768px) {
  .slide {
    height: 350px;

    &--thumbnail {
      height: 150px;
    }
  }
}
</style>
