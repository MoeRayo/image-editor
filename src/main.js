import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import axios from "axios";
import VueAxios from "vue-axios";
import "tachyons/css/tachyons.css";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(Notifications);
app.mount("#app");
