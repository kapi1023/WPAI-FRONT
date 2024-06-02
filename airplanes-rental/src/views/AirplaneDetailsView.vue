<template>
  <b-container>
    <b-row>
      <b-col md="8" class="mx-auto">
        <b-card>
          <h2>{{ airplane.model }}</h2>
          <p><strong>Capacity:</strong> {{ airplane.capacity }}</p>
          <p><strong>Price Per Day:</strong> {{ airplane.pricePerDay }}</p>
          <p><strong>Top Speed:</strong> {{ airplane.topSpeed }}</p>
          <p><strong>Fuel Usage:</strong> {{ airplane.fuelUsage }}</p>
          <img :src="airplane.image" alt="Airplane Image" class="img-fluid" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      airplane: {}
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  async created() {
    try {
      const response = await this.$axios.get(`/airplane?id=${this.id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      this.airplane = response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
