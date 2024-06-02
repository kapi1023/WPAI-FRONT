<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#">Airplane Rental</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="isAuthenticated" to="/">Airplanes</b-nav-item>
        <b-nav-item v-if="isAdmin" to="/reservations">Reservations</b-nav-item>
        <b-nav-item v-if="isAuthenticated && !isAdmin" to="/reservation_history">My Reservations</b-nav-item>
        <b-nav-item v-if="!isAuthenticated" to="/login">Login</b-nav-item>
        <b-nav-item v-if="!isAuthenticated" to="/register">Register</b-nav-item>
        <b-nav-item v-if="isAuthenticated" @click="handleLogout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin'])
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'Login' });
      });
    }
  }
};
</script>
