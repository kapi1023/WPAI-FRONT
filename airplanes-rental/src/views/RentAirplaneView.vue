<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mx-auto">
        <b-card title="Rent Airplane">
          <b-form @submit.prevent="rentAirplane">
            <b-form-group label="Start Date">
              <b-form-input type="date" v-model="startDate" required></b-form-input>
            </b-form-group>
            <b-form-group label="End Date">
              <b-form-input type="date" v-model="endDate" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block :disabled="loading">Rent</b-button>
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
      startDate: '',
      endDate: '',
      loading: false,
      alertMessage: '',
      alertVariant: 'danger'
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'token'])
  },
  methods: {
    ...mapActions(['addRent']),
    rentAirplane() {
      this.loading = true;
      this.addRent({
        airplane_id: this.$route.params.id,
        start_date: this.startDate,
        end_date: this.endDate
      }).then(() => {
        this.$router.push({ name: 'Airplanes' });
      }).catch((err) => {
        console.error(err);
        this.showAlert('Rent failed', 'danger');
      }).finally(() => {
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
