import Vue from 'vue';
import Vuex from 'vuex';
import { axiosInstance } from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
    status: '',
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, username, isAdmin }) {
      state.token = token;
      state.username = username;
      state.isAdmin = isAdmin;
      state.status = 'success';
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.username = '';
      state.isAdmin = false;
    },
    rent_request(state) {
      state.status = 'loading';
    },
    rent_success(state) {
      state.status = 'success';
    },
    rent_error(state) {
      state.status = 'error';
    }
  },
  actions: {
    registerAction({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axiosInstance({ url: '/register', data: user, method: 'POST' })
          .then(resp => {
            commit('auth_success', { token: '', username: user.username, isAdmin: false });
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            reject(err);
          });
      });
    },
    loginAction({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axiosInstance({ url: '/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token;
            const username = resp.data.username;
            const isAdmin = resp.data.isAdmin;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            commit('auth_success', { token, username, isAdmin });
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        delete axiosInstance.defaults.headers.common['Authorization'];
        resolve();
      });
    },
    addRent({ commit }, rent) {
      return new Promise((resolve, reject) => {
        commit('rent_request');
        axiosInstance({ url: '/rent', data: rent, method: 'POST' })
          .then(resp => {
            commit('rent_success');
            resolve(resp);
          })
          .catch(err => {
            commit('rent_error');
            reject(err);
          });
      });
    },
    deleteRent({ dispatch }, rentId) {
      return axiosInstance.delete(`/deleteRent/${rentId}`)
        .then(() => {
          dispatch('fetchRents');
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    username: state => state.username,
    isAdmin: state => state.isAdmin,
    token: state => state.token
  },
});
