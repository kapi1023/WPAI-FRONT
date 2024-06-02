<template>
  <div>
    <h1>Airplanes</h1>
    <b-button v-if="isAdmin" variant="primary" @click="goToAddAirplane">Add Airplane</b-button>
    <b-container>
      <b-row>
        <b-col>
          <b-form @submit.prevent="fetchAirplanes">
            <b-form-group label="Start Date">
              <b-form-input type="date" v-model="startDate"></b-form-input>
            </b-form-group>
            <b-form-group label="End Date">
              <b-form-input type="date" v-model="endDate"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Filter</b-button>
          </b-form>
          <b-table striped hover :items="airplanes" :fields="fields" responsive="sm">
            <template #cell(actions)="row">
              <b-button size="sm" @click="viewDetails(row.item.id)">Details</b-button>
              <b-button size="sm" variant="success" v-if="isAuthenticated && !isAdmin" @click="rentAirplane(row.item.id)">Rent</b-button>
              <b-button size="sm" variant="warning" v-if="isAdmin" @click="editAirplane(row.item.id)">Edit</b-button>
              <b-button size="sm" variant="danger" v-if="isAdmin" @click="deleteAirplane(row.item.id)">Delete</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      airplanes: [],
      fields: [
        { key: 'model', label: 'Model' },
        { key: 'capacity', label: 'Capacity' },
        { key: 'pricePerDay', label: 'Price Per Day' },
        { key: 'actions', label: 'Actions' }
      ],
      startDate: '',
      endDate: ''
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin', 'token']),
    isFiltered() {
      return this.startDate && this.endDate;
    }
  },
  watch: {
    isFiltered(newVal) {
      if (newVal) {
        if (!this.fields.find(f => f.key === 'availability')) {
          this.fields.splice(3, 0, { key: 'availability', label: 'Availability' });
        }
      } else {
        this.fields = this.fields.filter(f => f.key !== 'availability');
      }
    }
  },
  async created() {
    this.fetchAirplanes();
  },
  methods: {
    async fetchAirplanes() {
      try {
        const params = {};
        if (this.startDate) {
          params.start_date = this.startDate;
        }
        if (this.endDate) {
          params.end_date = this.endDate;
        }
        const response = await this.$axios.get('/airplanes', {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          params
        });
        this.airplanes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    viewDetails(id) {
      this.$router.push({ name: 'AirplaneDetails', params: { id } });
    },
    rentAirplane(id) {
      this.$router.push({ name: 'RentAirplane', params: { id } });
    },
    editAirplane(id) {
      this.$router.push({ name: 'EditAirplane', params: { id } });
    },
    async deleteAirplane(id) {
      try {
        await this.$axios.delete(`/deleteAirplane?id=${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.airplanes = this.airplanes.filter(airplane => airplane.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    goToAddAirplane() {
      this.$router.push({ name: 'AddAirplane' });
    }
  }
};
</script>
