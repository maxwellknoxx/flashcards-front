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
      UserService.logout(localStorage.getItem("id")).then(response => {
        if (response.data === true) {
          this.$store.dispatch("logout");
          this.$store.dispatch("setId", "");
          localStorage.removeItem("id");
          localStorage.removeItem("dictionaryId");
          this.$router.push("/");
        }
      });
    }
  }
};
</script>