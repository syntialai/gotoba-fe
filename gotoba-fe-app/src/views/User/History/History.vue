<template>
  <div class="history">
    <b-nav tabs fill>
      <b-nav-item
        to="/history" exact
        exact-active-class="active"
      >
        <div class="d-flex flex-column">
          <span class="tab-icon icon">
            <b-icon icon="clock" font-scale="1"></b-icon>
          </span>
          <span class="tab-title">RECENT</span>
        </div>
      </b-nav-item>
      <b-nav-item
        to="/history/done" exact
        exact-active-class="active"
      >
        <div class="d-flex flex-column">
          <span class="tab-icon icon">
            <b-icon icon="check-circle" font-scale="1"></b-icon>
          </span>
          <span class="tab-title">DONE</span>
        </div>
      </b-nav-item>
      <b-nav-item
        to="/history/cancelled" exact
        exact-active-class="active"
      >
        <div class="d-flex flex-column">
          <span class="tab-icon icon">
            <b-icon icon="x-circle" font-scale="1"></b-icon>
          </span>
          <span class="tab-title">CANCELLED</span>
        </div>
      </b-nav-item>
    </b-nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'History',
};
</script>
