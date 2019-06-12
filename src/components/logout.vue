<template>
  <div id="app">
    <h1>You are being disconnected...</h1>
  </div>
</template>


<script>
import Service from "../services/userService";

export default {
  mounted() {
    this.logout();
  },

  data() {
    return {
      id: localStorage.getItem("id")
    };
  },

  methods: {
    logout() {
      Service.logout(this.id).then(response => {
        if (response.data.status) {
          localStorage.removeItem("id");
          this.$router.push("/home");
        }
      });
    }
  }
};
</script>

<style>
</style>
