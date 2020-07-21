<template>
  <div class="footer align-center mt-3">
    <div class="bg-color-primary text-white semibold">
      <div class="explore">
        <h4 class="bold">EXPLORE MORE</h4>
        <hr>
        <ul class="pl-0">
          <li><router-link to="/about">About Lake Toba</router-link></li>
          <li><router-link to="/more/journey">Destinations</router-link></li>
          <li><router-link to="/more/restaurant">Restaurants</router-link></li>
          <li><router-link to="/more">Promotions</router-link></li>
        </ul>
      </div>
      <div class="contact">
        <h4 class="bold">CONTACT US</h4>
        <hr>
        <ul class="pl-0">
          <li class="contact-email">
            <font-awesome-icon icon="envelope" />
            <span class="contact-email-text pl-3">gotoba.service@gmail.com</span>
          </li>
          <li class="contact-phone">
            <font-awesome-icon icon="phone" />
            <span class="contact-phone-text pl-3">021-7667879</span>
          </li>
          <li class="contact-whatsapp">
            <font-awesome-icon :icon="['fab', 'whatsapp']" />
            <span class="contact-whatsapp-text pl-3">0895-6052-36639</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-color-blue-primary p-3">
      <div class="copyright font-size-12 semibold">
        © 2020 GoToba - FUTURE Medan
        <br>
        All rights reserved.
      </div>
      <div class="font-size-12 m-2">
        <router-link to="" class="text-white">Terms of Use</router-link> |
         <router-link to="" class="text-white">Privacy Policy</router-link> |
         <router-link to="" class="text-white">Site Map</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>

<style lang="scss" scoped>
.explore, .contact {
  padding: 20px 0;
}

hr {
  margin: 0 auto;
  border: 1px solid white;
  border-radius: 5px;
  width: 100px;
  margin-bottom: 24px;
}

li a, hr {
  color: white;
}

.footer {
  margin-bottom: 64px;
}
</style>
