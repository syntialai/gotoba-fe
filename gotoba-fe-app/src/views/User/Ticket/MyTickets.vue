<template>
  <div class="my-tickets bg-white m-0">
    <b-nav tabs justified>
      <b-nav-item
        to="/my-tickets" exact
        exact-active-class="active"
      >
        VALID
      </b-nav-item>
      <b-nav-item
        to="/my-tickets/expired" exact
        exact-active-class="active"
      >
        EXPIRED
      </b-nav-item>
    </b-nav>

    <router-view class="overflow-hidden min-vh-100"></router-view>

  </div>
</template>

<script>
export default {
  name: 'MyTickets',
};
</script>
