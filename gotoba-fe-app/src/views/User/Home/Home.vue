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
            :to="menu.link"
            class="bg-white border-square-10 p-3"
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
            <router-link to="/more">See all</router-link>
          </span>
        </div>
        <div class="d-flex content-card overflow-auto mt-1">
          <card-home
            v-for="ticket in promotions"
            :key="ticket.sku"
            v-bind="ticket"
            @click="goToDetails('promotion', ticket.sku)"
          />
        </div>
      </div> -->

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
            <router-link to="/more/journey">See all</router-link>
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
            @click="goToDetails('journey', journey.sku)"
          />
        </div>
      </div> -->

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
            <router-link to="/more/restaurant">See all</router-link>
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
            @click="goToDetails('restaurant', restaurant.sku)"
          />
        </div>
      </div>
    </div>

    <div class="gallery content-group my-3">
      <div class="title mb-1 pt-3 d-flex align-items-center">
        <font-awesome-icon
            :icon="['far', 'images']"
            class="icon-gradient font-size-24 pr-2"
          />
        <h6 class="font-color-blue-primary m-0">Our Gallery</h6>
      </div>

      <div class="info font-color-black-60 font-size-14 mb-3">
        Show every moment captured around Lake Toba
      </div>

      <gallery-home v-if="galleryData" :galleryData="galleryData" />
    </div>

    <the-footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isPassed } from '../../../utils/filter';
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
    GalleryHome,
    TheFooter,
    OngoingPromoIcon,
    NearbyPlaceIcon,
    NearbyRestoIcon,
  },
  computed: {
    ...mapGetters(['restaurantDatas', 'journeyData', 'ticketDatas', 'galleryData']),
    promotions() {
      const promotion = [...this.ticketDatas];

      return promotion
        .filter((ticket) => !isPassed(ticket.expiredDate))
        .sort((a, b) => b.expiredDate - a.expiredDate);
    },
  },
  created() {
    this.getRestaurantData();
    this.getJourneyData();
    this.getTicketData();
    this.getGalleryData();
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
      this.$router.push(`/${category}/${sku}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.content-group {
  margin-top: 40px;
}
</style>
