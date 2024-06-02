<template>
  <b-container>
    <b-row>
      <b-col md="8" class="mx-auto">
        <b-card :title="isEdit ? 'Edit Airplane' : 'Add Airplane'">
          <b-form @submit.prevent="submitForm">
            <b-form-group label="Model">
              <b-form-input v-model="airplane.model" required></b-form-input>
            </b-form-group>
            <b-form-group label="Capacity">
              <b-form-input type="number" v-model="airplane.capacity" required></b-form-input>
            </b-form-group>
            <b-form-group label="Price Per Day">
              <b-form-input type="number" step="0.01" v-model.number="airplane.pricePerDay" required></b-form-input>
            </b-form-group>
            <b-form-group label="Top Speed">
              <b-form-input type="number" v-model="airplane.topSpeed"></b-form-input>
            </b-form-group>
            <b-form-group label="Fuel Usage">
              <b-form-input type="number" step="0.01" v-model.number="airplane.fuelUsage"></b-form-input>
            </b-form-group>
            <b-form-group label="Image URL">
              <b-form-input v-model="airplane.image"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block>{{ isEdit ? 'Update' : 'Add' }} Airplane</b-button>
          </b-form>
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
      airplane: {
        model: '',
        capacity: 0,
        pricePerDay: 0.00,
        topSpeed: 0,
        fuelUsage: 0.00,
        image: ''
      },
      isEdit: false
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  async created() {
    if (this.id) {
      this.isEdit = true;
      await this.fetchAirplane();
    }
  },
  methods: {
    async fetchAirplane() {
      try {
        const response = await this.$axios.get(`/airplane?id=${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.airplane = response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message || 'An error occurred while fetching the airplane details');
        console.error(error);
      }
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await this.$axios.put(`/editAirplane`, this.airplane, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          });
        } else {
          await this.$axios.post(`/addAirplane`, this.airplane, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          });
        }
        this.$router.push({ name: 'Airplanes' });
        this.$toast.success(this.isEdit ? 'Airplane updated successfully' : 'Airplane added successfully');
      } catch (error) {
        this.$toast.error(error.response.data.message || 'An error occurred while saving the airplane');
        console.error(error);
      }
    }
  }
};
</script>
