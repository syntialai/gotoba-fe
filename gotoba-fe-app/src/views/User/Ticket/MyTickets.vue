<template>
  <div class="my-tickets position-relative bg-white m-0">
    <b-nav tabs class="position-relative" justified>
      <b-nav-item
        to="/my-tickets" exact
        exact-active-class="active"
      >
        <span class="tab-title">PENDING</span>
      </b-nav-item>
      <b-nav-item
        to="/my-tickets/expired" exact
        exact-active-class="active"
      >
        <span class="tab-title">EXPIRED</span>
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
