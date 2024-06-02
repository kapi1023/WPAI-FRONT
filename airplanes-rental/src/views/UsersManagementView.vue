<template>
  <div>
    <h1>User Management</h1>
    <b-container>
      <b-row>
        <b-col>
          <b-table striped hover :items="users" :fields="fields" responsive="sm">
            <template #cell(actions)="row">
              <b-button size="sm" variant="warning" @click="editUser(row.item)">Edit</b-button>
              <b-button size="sm" variant="danger" @click="deleteUser(row.item.id)">Delete</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    <b-modal v-model="showEditModal" title="Edit User">
      <b-form @submit.prevent="updateUser">
        <b-form-group label="Username">
          <b-form-input v-model="selectedUser.username" required></b-form-input>
        </b-form-group>
        <b-form-group label="Admin">
          <b-form-checkbox v-model="selectedUser.isAdmin">Is Admin</b-form-checkbox>
        </b-form-group>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      users: [],
      fields: [
        { key: 'username', label: 'Username' },
        { key: 'isAdmin', label: 'Admin' },
        { key: 'actions', label: 'Actions' }
      ],
      selectedUser: {},
      showEditModal: false
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$axios.get('/users', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.users = response.data;
      } catch (error) {
        this.$toast.error('Failed to fetch users');
        console.error(error);
      }
    },
    editUser(user) {
      this.selectedUser = { ...user };
      this.showEditModal = true;
    },
    async updateUser() {
      try {
        await this.$axios.put('/editUser', this.selectedUser, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.fetchUsers();
        this.showEditModal = false;
        this.$toast.success('User updated successfully');
      } catch (error) {
        this.$toast.error('Failed to update user');
        console.error(error);
      }
    },
    async deleteUser(id) {
      try {
        await this.$axios.delete(`/deleteUser?id=${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.fetchUsers();
        this.$toast.success('User deleted successfully');
      } catch (error) {
        this.$toast.error('Failed to delete user');
        console.error(error);
      }
    }
  },
  mounted() {
    this.$toast = this.$root.$toast;
  }
};
</script>
