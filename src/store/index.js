import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    user: {},
  },
  mutations: {
    retreiveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    // --------------------------------------
    getUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    logedIn(state) {
      return state.token != null;
    },
    user(state) {
      return state.user;
    },
  },
  actions: {},
});
