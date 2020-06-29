<template>
  <div class="gallery-home m-3">
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
import { mapActions, mapGetters } from 'vuex';
import { VueAgile } from 'vue-agile';

export default {
  name: 'GalleryHome',
  components: {
    agile: VueAgile,
  },
  computed: {
    ...mapGetters(['galleryData']),
    slides() {
      return this.galleryData.map((data) => data.image);
    },
  },
  created() {
    this.getGalleryData();
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

      // slides: [
      //   'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      //   'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      //   'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      //   'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      //   'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      //   'https://images.unsplash.com/photo-1472926373053-51b220987527?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      //   'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      // ],
    };
  },
  methods: {
    ...mapActions(['getGalleryData']),
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
