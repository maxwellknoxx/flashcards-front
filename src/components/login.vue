<template>
  <div id="app">
    <div class="container">
      <h1>{{ message }}</h1>

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
    <div class="centerSignup">
      <p>
        Not a member yet?
        <router-link to="/newUser">Sign Up</router-link>
      </p>
    </div>
    <BR/>
    <div class="centerForgotPassword">
      <p>
        Did you forget your password?
        <router-link to="/recoverInformation">Recover information</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import UserService from "../services/userService";

export default {
  data() {
    return {
      idUser: "",
      user: {
        userName: "",
        password: ""
      },
      message: ""
    };
  },

  methods: {
    login() {
      UserService.login(this.user).then(response => {
        if (response.data.status) {
          this.idUser = response.data.data.id;
          this.$store.dispatch("login");
          this.$store.dispatch("setId", this.idUser);
          localStorage.setItem('id', this.idUser);
          this.$router.push("/dictionaries/" + this.idUser);
        } else {
          this.message = response.data.message;
        }
      });
    }
  }
};
</script>

<style>
.centerSignup {
  margin: auto;
  width: 50%;
  border: 3px solid blue;
  padding: 10px;
}

.centerForgotPassword {
  margin: auto;
  width: 50%;
  border: 3px solid red;
  padding: 10px;
}
</style>

