<template>
  <b-container class="mt-5">
    <b-card>
      <h1>Login</h1>
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Username" label-for="username">
          <b-form-input
            id="username"
            v-model="credentials.username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password">
          <b-form-input
            type="password"
            id="password"
            v-model="credentials.password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    async submitForm() {
      try {
        const response = await axios.post(`/login`, this.credentials);
        const token = response.data.token;
        const user = {
          username: this.credentials.username,
          isAdmin: response.data.isAdmin,
        };
        this.login({ token, user });
        this.$router.push({ name: "Airplanes" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
