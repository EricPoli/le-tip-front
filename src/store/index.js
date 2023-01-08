import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const context = require.context("./modules", true, /index\.js$/);

const modules = {};

context.keys().forEach((file) => {
  // create the module name from file
  const moduleName = file.replace(/(\.\/|\/index\.js$)/g, "");

  // register file context under module name
  modules[moduleName] = context(file).default || context(file);

  // override namespaced option
  modules[moduleName].namespaced = true;
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ...modules,
  },
});
