import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVueNext, IconsPlugin } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(BootstrapVueNext);
app.use(IconsPlugin);

app.mount("#app");
