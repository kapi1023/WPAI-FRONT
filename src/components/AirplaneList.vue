<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        md="4"
        v-for="airplane in airplanes"
        :key="airplane.id"
        class="mb-4"
      >
        <b-card>
          <h5 class="card-title">{{ airplane.model }}</h5>
          <p class="card-text">Capacity: {{ airplane.capacity }}</p>
          <p class="card-text">Price per day: ${{ airplane.price_per_day }}</p>
          <p class="card-text" v-if="airplane.availability">Available</p>
          <p class="card-text text-danger" v-else>Not Available</p>
          <router-link
            class="btn btn-primary"
            :to="{ name: 'AirplaneDetails', params: { id: airplane.id } }"
            >View Details</router-link
          >
          <router-link
            class="btn btn-secondary"
            :to="{ name: 'EditAirplane', params: { id: airplane.id } }"
            v-if="isAdmin"
            >Edit</router-link
          >
          <b-button
            class="btn btn-danger"
            @click="deleteAirplane(airplane.id)"
            v-if="isAdmin"
            >Delete</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      airplanes: [],
    };
  },
  computed: {
    ...mapGetters(["isAdmin"]),
  },
  methods: {
    async fetchAirplanes() {
      try {
        const response = await axios.get("/airplanes");
        this.airplanes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAirplane(id) {
      try {
        await axios.post(`/delete_airplane`, { id });
        this.fetchAirplanes();
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchAirplanes();
  },
};
</script>
