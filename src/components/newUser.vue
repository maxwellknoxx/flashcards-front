<template>
  <div id="app">
    <div class="centerForm">
      <form @submit.prevent="register">
        <label>User Name:</label>
        <input type="text" required v-model="userInformation.userName">
        <label>Password:</label>
        <input type="password" required v-model="userInformation.password">
        <label>email:</label>
        <input type="text" required v-model="userInformation.email">
        <p>What is your favorite food?</p>
        <label>Answer:</label>
        <input type="text" required v-model="userInformation.answer">

        <button class="waves-effect waves-light btn-small">
          Register
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
      userInformation: {
        userName: "",
        password: "",
        email: "",
        answer: ""
      }
    };
  },

  methods: {
    register() {
      Service.register(this.userInformation).then(response => {
        if (response.data.logged) {
          this.$router.push("/dictionaries/" + response.data.data.id);
        }
      });
    }
  }
};
</script>

<style>
.centerForm {
  margin: auto;
  width: 50%;
  border: 3px solid pink;
  padding: 10px;
}
</style>


