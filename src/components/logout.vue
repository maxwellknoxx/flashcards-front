<template>
  <div id="app">
    <h1>You are being disconnected...</h1>
  </div>
</template>


<script>
import UserService from "../services/userService";

export default {
  mounted() {
    this.logout();
  },

  methods: {
    logout() {
      UserService.logout(localStorage.getItem('id'));
      this.$store.dispatch("logout");
      this.$store.dispatch("setId", "");
      localStorage.removeItem('id');
      this.$router.push('/');
    }
  }
};
</script>

<style>
</style>
