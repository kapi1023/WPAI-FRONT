<template>
  <b-container class="mt-5">
    <b-card>
      <h1>{{ airplane.model }}</h1>
      <b-card-img
        :src="airplane.image"
        alt="Airplane Image"
        class="mb-3"
      ></b-card-img>
      <b-card-text>
        <p>Capacity: {{ airplane.capacity }}</p>
        <p>Price per day: ${{ airplane.price_per_day }}</p>
        <p>Top Speed: {{ airplane.top_speed }} km/h</p>
        <p>Fuel Usage: {{ airplane.fuel_usage }} L/h</p>
        <p v-if="airplane.availability">Available</p>
        <p v-else class="text-danger">Not Available</p>
      </b-card-text>
      <b-button
        v-if="isAuthenticated && airplane.availability"
        @click="rentAirplane"
        variant="primary"
        >Rent</b-button
      >
      <b-button v-if="isAdmin" @click="editAirplane" variant="secondary"
        >Edit</b-button
      >
      <b-button v-if="isAdmin" @click="deleteAirplane" variant="danger"
        >Delete</b-button
      >
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      airplane: {},
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isAdmin"]),
  },
  methods: {
    async fetchAirplane() {
      try {
        const response = await axios.get(`/airplanes/${this.id}`);
        this.airplane = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    rentAirplane() {
      this.$router.push({ name: "RentAirplane", params: { id: this.id } });
    },
    editAirplane() {
      this.$router.push({ name: "EditAirplane", params: { id: this.id } });
    },
    async deleteAirplane() {
      try {
        await axios.post(`/delete_airplane`, { id: this.id });
        this.$router.push({ name: "Airplanes" });
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchAirplane();
  },
};
</script>
