<template>
  <div class="about">
    <background-image />

    <navigation-close class="margin-0" />

    <div class="overlay position-relative text-shadow-black mx-3 py-5">
      <h2 class="text-white">About Lake Toba</h2>
    </div>

    <b-row class="lake-toba p-3 mt-3">
      <b-col md="8" class="mt-3">
        <h3 class="font-color-blue-primary">
          Lake Toba
        </h3>
        <p>
          <b class="font-color-blue-secondary">Danau Toba</b> or
          <b class="font-color-blue-secondary">Toba Lake</b>
          is one of the most popular destinations in
          Indonesia, especially in Medan, North Sumatra. Danau Toba is the largest volcanic
          lake in Indonesia, even in the Southeast Asia. Which make it more special is taken from
          the Samosir Island, an Island that settled in the middle of the lake.
        </p>
      </b-col>
      <b-col md="4" align-self="center">
        <b-img
          fluid
          thumbnail
          src="@/assets/img/toba/danau-toba-night.jpg"
          alt="Lake Toba"
          w-100
          rounded
          class="mb-3"
        ></b-img>
      </b-col>
    </b-row>
    <b-row class="px-3">
      <b-col md="12">
        <h4 class="font-color-blue-primary">
          History
        </h4>
        <b-row>
          <b-col md="4" align-self="center">
            <b-img
              fluid
              src="@/assets/img/toba/samosir-island.jpg"
              alt="Lake Toba"
              w-100
              rounded
              thumbnail
              class="mb-3"
            ></b-img>
          </b-col>
          <b-col md="8">
            <p class="mb-0">
              Lake Toba is an area of 1,707 km², we can say that this is 1,000 km² bigger
              than Singapore. It formed by a gigantic volcanic eruption some 70,000 years
              ago, it is probably the largest resurgent caldera on Earth. Pulau Samosir or
              Samosir Island, The island in the middle, was joined to the caldera wall by a
              narrow isthmus, which was cut through to enable boats to pass; a road bridge
              crosses the cutting. Samosir island is the cultural centre of the Batak tribe,
              the indigenous from North Sumatra.
              <br />
              By the eruption of a super volcano (Mount Toba) was estimated to have caused
              mass death and extinction of several species of living creatures. The eruption
              of Mount Toba has led to changes in the earth's weather and the start into the
              ice age that affects the world civilization.
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="p-3 mt-3">
      <b-col md="12">
        <h4 class="font-color-blue-primary mb-4 align-center">
          <b>Where to Go</b> Around Lake Toba
        </h4>
        <b-row>
          <b-col md="4" class="mb-3">
            <b-card
              img-src="@/assets/img/toba/lake-sidihoni.jpg"
              img-top
              class="w-100 box-shadow font-color-black-87"
            >
              <b-card-sub-title class="p-3 bold">
                See a Lake inside a Lake
              </b-card-sub-title>
              <b-card-text class="px-3">
                Lake Sidihoni is famous for being a lake within a lake and it's surrounded
                by green hills and pine trees. Located on the west side of Samosir Island,
                it is no wonder that Lake Toba is unique on its own. A lake-ception indeed!
              </b-card-text>
            </b-card>
          </b-col>
          <b-col md="4" class="mb-3">
            <b-card
              img-src="@/assets/img/toba/sipiso-piso-2.jpg"
              img-top
              class="w-100 box-shadow font-color-black-87"
            >
              <b-card-sub-title class="p-3 bold">
                Breathtaking Views
              </b-card-sub-title>
              <b-card-text class="px-3">
                Sipiso-piso waterfall, the tallest waterfall in Indonesia,
                where the water travels from an underground river into a deep gorge.
                How cool is that?
              </b-card-text>
            </b-card>
          </b-col>
          <b-col md="4" class="mb-3">
            <b-card
              img-src="@/assets/img/toba/water-sport.jpg"
              img-top
              class="w-100 box-shadow font-color-black-87"
            >
              <b-card-sub-title class="p-3 bold">
                Water Sports
              </b-card-sub-title>
              <b-card-text class="px-3">
                There’s a wide range of water sport activities on Samosir Island including jet
                skiing, banana boats and kayaking. Play your hearts out on clear and stunning
                lake waters that will definitely leave you wanting more!
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <div class="gallery content-group" v-if="galleryData">
      <h4 class="font-color-blue-primary mb-0 mt-3 align-center">
        <b>Gallery</b> of Lake Toba
      </h4>

      <gallery-home :galleryData="galleryData" />
    </div>

    <the-footer class="mb-0 mt-4" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BackgroundImage from '../../../components/Partial/BackgroundImage.vue';
import GalleryHome from '../../../components/User/Home/GalleryHome.vue';
import NavigationClose from '../../../components/Partial/NavigationClose.vue';
import TheFooter from '../../../components/Partial/TheFooter.vue';

export default {
  name: 'About',
  components: {
    BackgroundImage,
    GalleryHome,
    NavigationClose,
    TheFooter,
  },
  computed: {
    ...mapGetters(['galleryData']),
  },
  created() {
    this.getGalleryData();
  },
  methods: {
    ...mapActions(['getGalleryData']),
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  margin: 8px 0!important;
}

.margin-0 {
  margin: 0!important;
}

@media screen and (min-width: 768px) {
  .lake-toba {
    margin-top: 150px;
  }
}
</style>
