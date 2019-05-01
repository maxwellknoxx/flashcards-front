<template>
  <div id="app">
    <div class="container">
      <form @submit.prevent="login">
        <label>User</label>
        <input type="text" required v-model="user.userName">

        <label>Password</label>
        <input type="password" required v-model="user.password">

        <button class="waves-effect waves-light btn-small">
          Login
          <i class="material-icons left">check</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Service from "../services/userService";

export default {
  data() {
    return {
      user: {
        userName: "",
        password: ""
      }
    };
  },

  methods: {
    login() {
      Service.login(this.user).then(response => {
        if (response.data.logged) {
          this.$router.push("/dictionaries/" + response.data.data.id);
        }
      });
    }
  }
};
</script>

<style>
</style>

