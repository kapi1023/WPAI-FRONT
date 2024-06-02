<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mx-auto">
        <b-card title="Login">
          <b-alert
            v-if="alertMessage"
            :variant="alertVariant"
            dismissible
            @dismissed="alertMessage = ''"
          >
            {{ alertMessage }}
          </b-alert>
          <b-form @submit.prevent="login">
            <b-form-group label="Username">
              <b-form-input v-model="username" required></b-form-input>
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input type="password" v-model="password" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block :disabled="loading">Login</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      alertMessage: '',
      alertVariant: 'danger'
    };
  },
  computed: {
    ...mapGetters(['authStatus']),
  },
  watch: {
    authStatus(newStatus) {
      this.loading = newStatus === 'loading';
    }
  },
  methods: {
    ...mapActions(['loginAction']),
    login() {
      this.loading = true;
      this.loginAction({ username: this.username, password: this.password })
        .then(() => {
          this.$router.push({ name: 'Airplanes' });
        })
        .catch((err) => {
          console.error(err);
          this.showAlert('Invalid credentials', 'danger');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showAlert(message, variant) {
      this.alertMessage = message;
      this.alertVariant = variant;
    }
  }
};
</script>
