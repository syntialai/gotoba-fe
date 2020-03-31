<template>
  <b-navbar class="bg-color-primary text-white">
    <b-navbar-nav>
      <b-navbar-item class="icon pr-2">
        <p><b-icon icon="arrow-left-short" /></p>
      </b-navbar-item>
      <b-navbar-item class="semibold font-size-24">
        {{ title }}
      </b-navbar-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBack',
  props: {
    title: '',
  },
};
</script>
