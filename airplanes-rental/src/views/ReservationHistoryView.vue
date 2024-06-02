<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>My Reservations</h1>
        <b-table striped hover :items="reservations" :fields="fields" responsive="sm">
          <template #cell(startDate)="row">
            {{ formatDate(row.item.startDate) }}
          </template>
          <template #cell(endDate)="row">
            {{ formatDate(row.item.endDate) }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      reservations: [],
      fields: [
        { key: 'model', label: 'Airplane Model' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'endDate', label: 'End Date' }
      ]
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  async created() {
    try {
      const response = await this.$axios.get('/reservation_history', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      this.reservations = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  }
};
</script>
