import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles/global.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
