<template>
  <div>
    <div>
      <button
        @click="redirectUser"
      >
        Redirect User
      </button>
    </div>
    <div>
      <button
        @click="getToken"
      >
        Get Token
      </button>
    </div>
    <div>
      <button
        @click="getAthlete"
      >
        Get Athlete
      </button>
    </div>
    <div>
      Athlete:
      {{ athlete }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Home',
  computed: {
    ...mapState(['athlete']),
  },
  methods: {
    redirectUser() {
      this.$store.dispatch('redirectUserToAuth');
    },

    async getToken() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if(!code){
        alert('code is required, redirect user before attempting to get token');
      }
      await this.$store.dispatch('getToken', code);
    },

    async getAthlete() {
      await this.$store.dispatch('getAuthenticatedAthlete');
    }
  }
});
</script>
