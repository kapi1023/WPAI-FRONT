<template>
  <div id="app">
    <NavBar />
    <b-container class="mt-4">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavBar from './components/NavbarComponent.vue';

export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}
</style>
