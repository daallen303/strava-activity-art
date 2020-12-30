import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    athlete: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setAthlete(state, athlete) {
      state.athlete = athlete;
    }
  },
  actions: {
    async redirectUserToAuth() {
      window.location.replace('https://www.strava.com/oauth/authorize?client_id=59033&redirect_uri=http://localhost:8080&response_type=code&scope=read');
    },

    async getToken({ commit }, code) {
      const response = await axios.request({
        method: 'POST',
        url: 'https://www.strava.com/oauth/token',
        data: {
          client_id: '59033',
          client_secret: process.env.VUE_APP_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code'
        }
      });
      const user = response.data;
      commit('setUser', user);
    },

    async getAuthenticatedAthlete({ commit, state }) {
      if(!state.user) {
        alert('must get user token before calling endpoint');
        return;
      }

      const response = await axios.request({
        method: 'GET',
        url: 'https://www.strava.com/api/v3/athlete',
        headers: {
          Authorization: `Bearer ${state.user.access_token}`
        }
      });
      const athlete = response.data;
      commit('setAthlete', athlete);
    }
  },
  modules: {
  }
});
