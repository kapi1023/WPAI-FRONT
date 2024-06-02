<template>
    <div>
      <h1>Manage Rents</h1>
      <b-table striped hover :items="rents" :fields="fields" responsive="sm">
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="deleteRent(row.item.id)">Delete</b-button>
        </template>
      </b-table>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        fields: [
          { key: 'id', label: 'ID' },
          { key: 'airplane_id', label: 'Airplane ID' },
          { key: 'user_id', label: 'User ID' },
          { key: 'start_date', label: 'Start Date' },
          { key: 'end_date', label: 'End Date' },
          { key: 'actions', label: 'Actions' }
        ]
      };
    },
    computed: {
      ...mapGetters(['rents'])
    },
    created() {
      this.fetchRents();
    },
    methods: {
      ...mapActions(['fetchRents', 'deleteRent']),
      deleteRent(id) {
        this.deleteRent(id);
      }
    }
  };
  </script>
  