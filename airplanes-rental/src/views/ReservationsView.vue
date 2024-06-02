<template>
  <b-container>
    <b-row>
      <b-col md="8" class="mx-auto">
        <b-card title="Reservations">
          <b-table striped hover :items="reservations" :fields="fields" responsive="sm">
            <template #cell(actions)="row">
              <b-button size="sm" variant="danger" v-if="isAdmin" @click="deleteReservation(row.item.id)">Delete</b-button>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      reservations: [],
      fields: [
        { key: 'model', label: 'Airplane Model' },
        { key: 'start_date', label: 'Start Date' },
        { key: 'end_date', label: 'End Date' },
        { key: 'actions', label: 'Actions' }
      ]
    };
  },
  computed: {
    ...mapGetters(['token', 'isAdmin'])
  },
  async created() {
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await this.$axios.get('/reservations', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.reservations = response.data;
      } catch (error) {
        console.error(error);
        this.$toast.error('Failed to fetch reservations');
      }
    },
    async deleteReservation(id) {
      try {
        await this.$axios.delete(`/deleteRent?id=${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
        this.$toast.success('Reservation deleted successfully');
      } catch (error) {
        console.error(error);
        this.$toast.error('Failed to delete reservation');
      }
    }
  },
  mounted() {
    this.$toast = useToast();
  }
};
</script>
