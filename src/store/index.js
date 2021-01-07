import { Promise } from "core-js";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
    setUser(state, user) {
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
    getUser(state) {
      return state.user;
    },
    isAdmin(state){
      return state.user.roles.includes('ADMIN')
    }
  },
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8787/stock-api/auth", user)
          .then((res) => {
            var token = res.data.token;
            var decoded = jwt_decode(token);
            var tuser = {
              name :decoded.sub,
              roles: decoded.roles
            }
            context.commit("setUser",tuser);
            localStorage.setItem("access_token", token);
            context.commit("retreiveToken", token);
            console.log(decoded);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    destroyToken(context){
      context.commit("destroyToken");
      localStorage.removeItem("access_token");
    }
  },
});
