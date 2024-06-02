<template>
  <b-container>
    <b-row>
      <b-col md="8" class="mx-auto">
        <b-card title="Add New Airplane">
          <b-form @submit.prevent="submitForm">
            <b-form-group label="Model">
              <b-form-input v-model="model" required></b-form-input>
            </b-form-group>
            <b-form-group label="Capacity">
              <b-form-input type="number" v-model="capacity" required></b-form-input>
            </b-form-group>
            <b-form-group label="Price Per Day">
              <b-form-input type="number" v-model="pricePerDay" required></b-form-input>
            </b-form-group>
            <b-form-group label="Top Speed">
              <b-form-input type="number" v-model="topSpeed" required></b-form-input>
            </b-form-group>
            <b-form-group label="Fuel Usage">
              <b-form-input type="number" v-model="fuelUsage" required></b-form-input>
            </b-form-group>
            <b-form-group label="Image URL">
              <b-form-input v-model="image" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block>Add Airplane</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      model: '',
      capacity: 0,
      pricePerDay: 0,
      topSpeed: 0,
      fuelUsage: 0,
      image: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        await this.$axios.post('/addAirplane', {
          model: this.model,
          capacity: this.capacity,
          pricePerDay: this.pricePerDay,
          topSpeed: this.topSpeed,
          fuelUsage: this.fuelUsage,
          image: this.image
        });
        this.$router.push({ name: 'Airplanes' });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
