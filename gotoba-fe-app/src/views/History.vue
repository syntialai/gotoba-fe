<template>
  <div class="history">
    <b-card no-body>
      <b-card-header header-tag="nav" class="box-shadow">
        <b-nav card-header tabs>
          <b-nav-item 
            to="/history" exact
            exact-active-class="active"
          >
            <div class="d-flex flex-column">
              <span class="tab-icon icon">
                <b-icon icon="check-circle"></b-icon>
              </span>
              <span class="tab-title">ACTIVE</span>
            </div>
          </b-nav-item>
          <b-nav-item
            to="/history/pending" exact
            exact-active-class="active"
          >
            <div class="d-flex flex-column">
              <span class="tab-icon icon">
                <b-icon icon="clock"></b-icon>
              </span>
              <span class="tab-title">PENDING</span>
            </div>
          </b-nav-item>
          <b-nav-item
            to="/history/cancelled" exact
            exact-active-class="active"
          >
            <div class="d-flex flex-column">
              <span class="tab-icon icon">
                <b-icon icon="x-circle"></b-icon>
              </span>
              <span class="tab-title">CANCELLED</span>
            </div>
          </b-nav-item>
        </b-nav>
      </b-card-header>

      <b-card-body>
        <router-view></router-view>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'History',
};
</script>
