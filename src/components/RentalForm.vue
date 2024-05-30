<template>
  <b-container class="mt-5">
    <b-card>
      <h1>Rent Airplane</h1>
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Number of Days" label-for="days">
          <b-form-input
            type="number"
            id="days"
            v-model="rental.days"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Rent</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rental: {
        airplane_id: this.id,
        days: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post(`/rent`, this.rental);
        this.$router.push({ name: "Airplanes" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
