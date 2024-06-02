import Vue from 'vue';
import Router from 'vue-router';
import AirplanesView from '@/views/AirplanesView.vue';
import AirplaneDetailsView from '@/views/AirplaneDetailsView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import RentAirplaneView from '@/views/RentAirplaneView.vue';
import AirplaneForm from '@/components/AirplaneForm.vue';
import ReservationsView from '@/views/ReservationsView.vue';
import ReservationHistoryView from '@/views/ReservationHistoryView.vue';
import UsersManagementView from '@/views/UsersManagementView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Airplanes',
      component: AirplanesView
    },
    {
      path: '/airplane/:id',
      name: 'AirplaneDetails',
      component: AirplaneDetailsView,
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/rent/:id',
      name: 'RentAirplane',
      component: RentAirplaneView,
      props: true
    },
    {
      path: '/addAirplane',
      name: 'AddAirplane',
      component: AirplaneForm
    },
    {
      path: '/editAirplane/:id',
      name: 'EditAirplane',
      component: AirplaneForm,
      props: true
    },
    {
      path: '/reservations',
      name: 'Reservations',
      component: ReservationsView
    },
    {
      path: '/reservation_history',
      name: 'ReservationHistory',
      component: ReservationHistoryView
    },
    {
      path: '/users',
      name: 'UsersManagement',
      component: UsersManagementView
    }
  ]
});
