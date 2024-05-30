<template>
  <b-container class="mt-5">
    <b-jumbotron
      header="Welcome to Airplane Rental"
      lead="Your one-stop solution for renting airplanes."
    >
      <p>Find the perfect airplane for your needs and rent it with ease.</p>
      <b-button variant="primary" to="/airplanes">View Airplanes</b-button>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
