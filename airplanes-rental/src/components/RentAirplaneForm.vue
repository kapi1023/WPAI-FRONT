<template>
  <b-container>
    <b-form @submit.prevent="submitForm">
      <b-form-group label="Start Date">
        <b-form-datepicker v-model="startDate" required></b-form-datepicker>
      </b-form-group>
      <b-form-group label="End Date">
        <b-form-datepicker v-model="endDate" required></b-form-datepicker>
      </b-form-group>
      <b-button type="submit" variant="primary">Rent</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      startDate: '',
      endDate: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('/rent', {
          airplane_id: this.$route.params.id,
          start_date: this.startDate,
          end_date: this.endDate
        });
        this.$router.push({ name: 'Airplanes' });
        this.$toast.success('Airplane rented successfully');
      } catch (error) {
        console.error(error);
        this.$toast.error('Failed to rent airplane');
      }
    }
  },
  mounted() {
    this.$toast = useToast();
  }
};
</script>
