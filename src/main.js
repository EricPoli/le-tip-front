import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Vue from "vue";
import Notifications from "vue-notification";
import VueTheMask from "vue-the-mask";
import store from "./store";

import App from "./App.vue";
import router from "./router";

import "./assets/scss/main.scss";

Vue.filter("REAL", function (value) {
  return parseFloat(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
});

Vue.filter("CURRENCY", function (value, value1, currency) {
  return parseFloat(value).toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
});

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueTheMask);
Vue.use(Notifications);

Vue.config.errorHandler = (error) => console.log(error);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
