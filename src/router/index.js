import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AirplanesView from "@/views/AirplanesView.vue";
import AddAirplane from "@/views/AddAirplane.vue";
import EditAirplane from "@/views/EditAirplane.vue";
import RentAirplane from "@/views/RentAirplane.vue";
import AirplaneDetails from "@/views/AirplaneDetails.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/airplanes", name: "Airplanes", component: AirplanesView },
  { path: "/add-airplane", name: "AddAirplane", component: AddAirplane },
  {
    path: "/edit-airplane/:id",
    name: "EditAirplane",
    component: EditAirplane,
    props: true,
  },
  {
    path: "/rent-airplane/:id",
    name: "RentAirplane",
    component: RentAirplane,
    props: true,
  },
  {
    path: "/airplanes/:id",
    name: "AirplaneDetails",
    component: AirplaneDetails,
    props: true,
  },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
