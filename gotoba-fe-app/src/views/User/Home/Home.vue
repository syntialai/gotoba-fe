<template>
  <div class="home">
    <div class="home-content px-3">
      <div id="category" class="my-3 p-2">
        <b-button-group
          class="d-flex justify-content-around box-shadow bg-white border-square-10"
        >
          <b-button
            v-for="menu in mainMenus"
            :key="menu.name"
            :to="menu.link"
            class="bg-white border-square-10 px-2 py-3 border-none"
          >
            <div class="menu-icon">
              <font-awesome-icon
                :icon="menu.icon"
                :class="'fa-2x font-color-accent-' + menu.color"
              ></font-awesome-icon>
            </div>
            <div class="pt-2 menu-name font-color-black-60">{{ menu.name }}</div>
          </b-button>
        </b-button-group>
      </div>

      <div class="carousel my-3 box-shadow">
        <b-carousel
          id="toba-carousel"
          :interval="3000"
          controls
          indicators
          img-width="768"
          img-height="512"
          class="text-shadow-black"
        >
          <b-carousel-slide
            caption="Lake Toba"
            text="Extraordinary natural wonder of the world in North Sumatra"
            img-src="@/assets/img/toba/danau-toba.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Samosir Island"
            text="The world’s largest island within an island, located in Lake Toba"
            img-src="@/assets/img/toba/samosir-island.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Sipiso Piso Waterfall"
            text="Find one of the beautiful waterfall near Lake Toba"
            img-src="@/assets/img/toba/sipiso-piso.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Tuktuk Siadong"
            text="Find a great laid back place to chill out for a few days"
            img-src="@/assets/img/toba/tuk-tuk.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Lake Toba"
            :text="'Surrounded by stunning mountains, waterfalls, hot springs, and many'
            + 'cultural villages. Join us!'"
            img-src="@/assets/img/toba/danau-toba-night.jpg"
          ></b-carousel-slide>
        </b-carousel>
      </div>

      <div class="ongoing-promo content-group" v-if="ticketPromotion">
        <div class="title font-color-blue-primary">
          <span class="title-icon pr-2">
            <ongoing-promo-icon />
          </span>
          <span class="title-text font-weight-bold">Ongoing Promos</span>
        </div>
        <div class="d-flex justify-content-between mt-2 mb-2">
          <span class="title-description semibold">Sale Ticket Price!</span>
          <span class="show-all font-size-14">
            <router-link to="/more">See all</router-link>
          </span>
        </div>
        <div class="d-flex content-card overflow-auto mt-1">
          <div
            class="responsive-card"
            v-for="ticket in ticketPromotion"
            :key="ticket.title"
          >
            <router-link
              :to="goToDetails('ticket', ticket.sku)"
            >
              <card-ticket-promotion
                :name="ticket.title"
                :image="ticket.image"
                :price="ticket.price"
                :discount="ticket.discount"
                :sku="ticket.sku"
              />
            </router-link>
          </div>
        </div>
      </div>

      <div class="nearby-place content-group" v-if="journeyData">
        <div class="title font-color-blue-primary">
          <span class="title-icon pr-2">
            <nearby-place-icon />
          </span>
          <span class="title-text font-weight-bold">Recommended Nearby Places</span>
        </div>
        <div class="d-flex justify-content-between">
          <span class="title-description semibold my-2">
            Best Journey of Lake Toba
          </span>
          <span class="show-all font-size-14">
            <router-link to="/more/journey">See all</router-link>
          </span>
        </div>
        <div class="d-flex content-card overflow-auto mt-1">
          <div
            class="responsive-card"
            v-for="journey in journeyData"
            :key="journey.sku"
          >
            <router-link
              :to="goToDetails('journey', journey.sku)"
            >
              <card-home
                :name="journey.name"
                :image="journey.image"
                :location="journey.address"
                :rating="journey.rating"
              />
            </router-link>
          </div>
        </div>
      </div>

      <div class="nearby-resto content-group" v-if="restaurantDatas">
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
            <router-link to="/more/restaurant">See all</router-link>
          </span>
        </div>
        <div class="d-flex content-card overflow-auto mt-1">
          <div
            class="responsive-card"
            v-for="restaurant in restaurantDatas"
            :key="restaurant.sku"
          >
            <router-link
              :to="goToDetails('restaurant', restaurant.sku)"
            >
              <card-home
                :name="restaurant.name"
                :image="restaurant.image"
                :location="restaurant.location"
                :rating="restaurant.rating"
              />
            </router-link>
          </div>
        </div>
      </div>

      <div class="gallery content-group mb-3" v-if="galleryData">
        <div class="title mb-1 pt-3 d-flex align-items-center">
          <font-awesome-icon
              :icon="['far', 'images']"
              class="icon-gradient font-size-24 pr-2"
            />
          <h6 class="font-color-blue-primary bold m-0">Our Gallery</h6>
        </div>

        <div class="d-flex justify-content-between">
          <div class="info font-color-black-60 font-size-14 mb-3">
            Show every moment captured around Lake Toba
          </div>
          <div class="show-all">
            <router-link to="/gallery">Show all</router-link>
          </div>
        </div>

        <gallery-home :galleryData="galleryData" />
      </div>
    </div>

    <the-footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardTicketPromotion from '../../../components/User/Home/CardTicketPromotion.vue';
import CardHome from '../../../components/User/Home/CardHome.vue';
import GalleryHome from '../../../components/User/Home/GalleryHome.vue';
import TheFooter from '../../../components/Partial/TheFooter.vue';
import {
  OngoingPromoIcon, NearbyPlaceIcon, NearbyRestoIcon,
} from '../../../components/Partial/IconsCustom.vue';

export default {
  name: 'Home',
  components: {
    CardHome,
    CardTicketPromotion,
    GalleryHome,
    TheFooter,
    OngoingPromoIcon,
    NearbyPlaceIcon,
    NearbyRestoIcon,
  },
  computed: {
    ...mapGetters(['restaurantDatas', 'journeyData', 'ticketPromotion', 'galleryData']),
  },
  created() {
    this.getGalleryData();
    this.getRestaurantData();
    this.getJourneyData();
    this.getTicketData();
  },
  data() {
    return {
      mainMenus: [
        {
          name: 'Journey',
          link: '/more/journey',
          icon: 'map-marked-alt',
          color: 'green',
        },
        {
          name: 'Bistro',
          link: '/more/restaurant',
          icon: 'utensils',
          color: 'orange',
        },
        {
          name: 'Tour Guide',
          link: '/more/tour-guide',
          icon: 'user-tie',
          color: 'purple',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getRestaurantData', 'getJourneyData', 'getTicketData', 'getGalleryData']),
    goToDetails(category, sku) {
      return `/${category}/${sku}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-group {
  margin-top: 40px;
}

.menu-name {
  font-size: 14px!important;
}

@media screen and (min-width: 425px) {
  .menu-name {
    font-size: 16px!important;
  }
}

@media screen and (min-width: 768px) {
  .menu-name {
    font-size: 20px!important;
  }
}
</style>
