import { Promise } from "core-js";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8080/stock-api/auth", user)
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("access_token", token);
            context.commit("retreiveToken", token);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
