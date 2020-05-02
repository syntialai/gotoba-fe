<template>
  <div class="my-tickets">
    <b-card no-body>
      <b-card-header header-tag="nav" class="box-shadow">
        <b-nav card-header tabs>
          <b-nav-item
            to="/tickets/" exact
            exact-active-class="active"
          >
            <span class="tab-title">PENDING</span>
          </b-nav-item>
          <b-nav-item
            to="/tickets/expired" exact
            exact-active-class="active"
          >
            <span class="tab-title">EXPIRED</span>
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
  name: 'MyTickets',
};
</script>
