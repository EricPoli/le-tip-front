import { getRates } from "@/services/conversion.service";

export default {
  namespaced: true,
  state: {
    ratesRequestStatus: "init",
    rates: null,
  },
  getters: {
    // STATUS
    getRatesReqStatus(state) {
      return state.ratesRequestStatus;
    },
    getRatesDetails(state) {
      return state.rates;
    },
  },
  mutations: {
    // STATUS
    RATES_STATUS(state, value) {
      state.userRequestStatus = value;
    },
    SET_RATES(state, rates) {
      state.rates = rates;
    },
  },
  actions: {
    async fetchRates({ commit }, param) {
      commit("RATES_STATUS", "pending");
      try {
        const { data } = await getRates(param);
        commit("RATES_STATUS", "init");
        commit("SET_RATES", data);
      } catch (error) {
        commit("RATES_STATUS", "init");
        throw error;
      }
    },
  },
};
