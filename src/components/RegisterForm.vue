<template>
  <b-container class="mt-5">
    <b-card>
      <h1>Register</h1>
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Username" label-for="username">
          <b-form-input
            id="username"
            v-model="user.username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password">
          <b-form-input
            type="password"
            id="password"
            v-model="user.password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post(`/register`, this.user);
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
