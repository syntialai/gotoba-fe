<template>
  <div id="nav">
    <b-navbar variant="faded" class="bg-transparent text-white">
      <b-navbar-brand href="/">
        <img src="https://placekitten.com/g/30/30"
          class="d-inline-block align-top"
          alt="gotoba"
        >
        gotoba
      </b-navbar-brand>
      <b-navbar-nav right>
        <b-nav-item href="/search">
          <b-icon icon="search"></b-icon>
        </b-nav-item>
        <b-nav-item href="/notification">
          <b-icon icon="bell-fill"></b-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
}
</script>
