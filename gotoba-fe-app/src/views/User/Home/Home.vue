<template>
  <div class="home">
    <div class="container">
      <div id="category" class="m-3">
        <b-button-group
          class="d-flex justify-content-around box-shadow bg-white border-square-10"
        >
          <b-button
            v-for="menu in mainMenus"
            :key="menu.name"
            :href="menu.link"
            class="bg-white border-square-10 p-3"
          >
            <div class="menu-icon">
              <!-- <font-awesome-layers class="fa">
                <font-awesome-icon
                  icon="circle"
                  :class="['font-color-accent' + menu.color]"
                />
                <font-awesome-icon
                  :icon="menu.icon"
                  transform="shrink-1 left-20"
                />
              </font-awesome-layers> -->
              <font-awesome-icon
                :icon="menu.icon"
                :class="'fa-2x font-color-accent-' + menu.color"
              ></font-awesome-icon>
            </div>
            <div class="pt-2 menu-name font-color-black-60">{{ menu.name }}</div>
          </b-button>
        </b-button-group>
      </div>

      <div class="ongoing-promo content-group">
        <div class="title font-color-blue-primary">
          <span class="title-icon pr-2">
            <ongoing-promo-icon />
          </span>
          <span class="title-text font-weight-bold">Ongoing Promos</span>
        </div>
        <div class="d-flex justify-content-between mt-2 mb-2">
          <span class="title-description semibold">Sale Ticket Price!</span>
          <span class="show-all font-size-14">
            <a href="">See all</a>
          </span>
        </div>
        <div class="d-flex content-card overflow-auto mt-1">
          <card-home
            name="Syntia"
            image="@/assets/img/logo.png"
            location="Vue js"
            :rating="5.0"
          />
          <card-home
            name="Syntia"
            image="@/assets/img/logo.png"
            location="Vue js"
            :rating="5.0"
          />
        </div>
      </div>

      <div class="nearby-place content-group">
        <div class="title font-color-blue-primary">
          <span class="title-icon pr-2">
            <nearby-place-icon />
          </span>
          <span class="title-text font-weight-bold">Recommended Nearby Places</span>
        </div>
        <div class="d-flex justify-content-between">
          <span class="title-description semibold mt-2 mb-2">
            Best Journey of Lake Toba
          </span>
          <span class="show-all font-size-14">
            <a href="">See all</a>
          </span>
        </div>
        <div class="d-flex content-card overflow-auto mt-1">
          <card-home
          v-for="journey in journeyData"
            :key="journey.sku"
            :name="journey.name"
            :image="journey.image"
            :location="journey.location"
            :rating="journey.rating"
          />
        </div>
      </div>

      <div class="nearby-resto content-group">
        <div class="title font-color-blue-primary">
          <span class="title-icon pr-2">
            <nearby-resto-icon />
          </span>
          <span class="title-text font-weight-bold">Find Eats near Danau Toba</span>
        </div>
        <div class="d-flex justify-content-between mt-2 mb-2">
          <span class="title-description semibold">
            Best Restaurant near Lake Toba
          </span>
          <span class="show-all font-size-14">
            <a href="">See all</a>
          </span>
        </div>
        <div class="d-flex content-card overflow-auto mt-1">
          <card-home
            v-for="restaurant in restaurantDatas"
            :key="restaurant.sku"
            :name="restaurant.name"
            :image="restaurant.image"
            :location="restaurant.location"
            :rating="restaurant.rating"
          />
        </div>
      </div>

      <div class="nearby-hotel content-group">
        <div class="title font-color-blue-primary">
          <span class="title-icon pr-2">
            <nearby-hotel-icon />
          </span>
          <span class="title-text font-weight-bold">Where to Stay</span>
        </div>
        <div class="d-flex justify-content-between mt-2 mb-2">
          <span class="title-description semibold">
            Best Hotel/Homestay near Lake Toba
          </span>
          <span class="show-all font-size-14">
            <a href="">See all</a>
          </span>
        </div>
        <div class="d-flex content-card overflow-auto mt-1">
          <card-home
            name="Syntia"
            image="@/assets/img/logo.png"
            location="Vue js"
            :rating="5.0"
          />
        </div>
      </div>
    </div>

    <gallery-home />

    <the-footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardHome from '../../../components/User/Home/CardHome.vue';
import GalleryHome from '../../../components/User/Home/GalleryHome.vue';
import TheFooter from '../../../components/Partial/TheFooter.vue';
import {
  OngoingPromoIcon, NearbyPlaceIcon, NearbyRestoIcon, NearbyHotelIcon,
} from '../../../components/Partial/IconsCustom.vue';

export default {
  name: 'Home',
  components: {
    CardHome,
    GalleryHome,
    TheFooter,
    OngoingPromoIcon,
    NearbyPlaceIcon,
    NearbyRestoIcon,
    NearbyHotelIcon,
  },
  computed: {
    ...mapGetters(['restaurantDatas', 'journeyData']),
  },
  created() {
    this.getRestaurantData();
    this.getJourneyData();
  },
  data() {
    return {
      mainMenus: [
        {
          name: 'Journey',
          link: '/',
          icon: 'map-marked-alt',
          color: 'green',
        },
        {
          name: 'Bistro',
          link: '/',
          icon: 'utensils',
          color: 'orange',
        },
        {
          name: 'Homestay',
          link: '/',
          icon: 'hotel',
          color: 'purple',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getRestaurantData', 'getJourneyData']),
  },
};
</script>

<style lang="scss" scoped>
.content-group {
  margin-top: 40px;
}
</style>
