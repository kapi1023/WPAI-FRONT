<template>
  <b-container class="mt-5">
    <b-card>
      <h1>{{ isEdit ? "Edit Airplane" : "Add Airplane" }}</h1>
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Model" label-for="model">
          <b-form-input
            id="model"
            v-model="airplane.model"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Capacity" label-for="capacity">
          <b-form-input
            type="number"
            id="capacity"
            v-model="airplane.capacity"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Price per Day" label-for="price_per_day">
          <b-form-input
            type="number"
            id="price_per_day"
            v-model="airplane.price_per_day"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Top Speed (km/h)" label-for="top_speed">
          <b-form-input
            type="number"
            id="top_speed"
            v-model="airplane.top_speed"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Fuel Usage (L/h)" label-for="fuel_usage">
          <b-form-input
            type="number"
            id="fuel_usage"
            v-model="airplane.fuel_usage"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Image URL" label-for="image">
          <b-form-input
            type="text"
            id="image"
            v-model="airplane.image"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary"
          >{{ isEdit ? "Update" : "Add" }} Airplane</b-button
        >
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
      default: null,
    },
  },
  data() {
    return {
      airplane: {
        model: "",
        capacity: "",
        price_per_day: "",
        top_speed: "",
        fuel_usage: "",
        image: "",
      },
    };
  },
  computed: {
    isEdit() {
      return this.id !== null;
    },
  },
  methods: {
    async fetchAirplane() {
      if (this.isEdit) {
        try {
          const response = await axios.get(`/airplanes/${this.id}`);
          this.airplane = response.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await axios.post(`/edit_airplane`, this.airplane);
        } else {
          await axios.post(`/add_airplane`, this.airplane);
        }
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
