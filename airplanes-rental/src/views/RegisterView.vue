<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mx-auto">
        <b-card title="Register">
          <b-alert
            v-if="alertMessage"
            :variant="alertVariant"
            dismissible
            @dismissed="alertMessage = ''"
          >
            {{ alertMessage }}
          </b-alert>
          <b-form @submit.prevent="register">
            <b-form-group label="Username">
              <b-form-input v-model="username" required></b-form-input>
            </b-form-group>
            <b-form-group label="Password" :state="passwordState">
              <b-form-input type="password" v-model="password" required></b-form-input>
              <b-form-invalid-feedback>Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Confirm Password" :state="confirmPasswordState">
              <b-form-input type="password" v-model="confirmPassword" required></b-form-input>
              <b-form-invalid-feedback>Passwords must match.</b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" variant="primary" block :disabled="loading">Register</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
      alertMessage: '',
      alertVariant: 'danger'
    };
  },
  computed: {
    passwordState() {
      return this.password.length === 0 || this.validatePassword(this.password) ? null : false;
    },
    confirmPasswordState() {
      return this.confirmPassword.length === 0 || this.password === this.confirmPassword ? null : false;
    },
    formValid() {
      return this.username && this.validatePassword(this.password) && this.password === this.confirmPassword;
    }
  },
  methods: {
    ...mapActions(['registerAction']),
    register() {
      if (!this.username) {
        this.showAlert("Username is required", 'danger');
        this.$toast.error("Username is required");
        return;
      }
      if (!this.validatePassword(this.password)) {
        this.showAlert("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.", 'danger');
        this.$toast.error("Invalid password");
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.showAlert("Passwords must match", 'danger');
        this.$toast.error("Passwords must match");
        return;
      }

      this.loading = true;
      this.registerAction({ username: this.username, password: this.password })
        .then(() => {
          this.showAlert('Registration successful!', 'success');
          this.$toast.success("Registration successful!");
          this.$router.push({ name: 'Login' });
        })
        .catch((err) => {
          console.error("Registration failed", err);
          this.showAlert("Registration failed", 'danger');
          this.$toast.error("Registration failed");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validatePassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return regex.test(password);
    },
    showAlert(message, variant) {
      this.alertMessage = message;
      this.alertVariant = variant;
    }
  }
};
</script>
