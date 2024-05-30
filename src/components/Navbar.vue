<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="/">Airplane Rental</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!isAuthenticated" to="/login">Login</b-nav-item>
        <b-nav-item v-if="!isAuthenticated" to="/register">Register</b-nav-item>
        <b-nav-item v-if="isAuthenticated" to="/airplanes"
          >Airplanes</b-nav-item
        >
        <b-nav-item v-if="isAdmin" to="/add-airplane">Add Airplane</b-nav-item>
        <b-button v-if="isAuthenticated" @click="logout" variant="danger"
          >Logout</b-button
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "isAdmin"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
