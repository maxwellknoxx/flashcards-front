<template>
  <div id="app">
    <div class="centerForm">
      <br>
      {{ message }}
      <form @submit.prevent="register">
        <label>User Name:</label>
        <input
          type="text"
          required
          v-model="userInformation.userName"
          @blur="validateUserField()"
          @click="cleanMessage()"
        >
        <label>Password:</label>
        <input
          type="password"
          required
          v-model="userInformation.password">
        <label>E-mail:</label>
        <input type="email" required v-model="userInformation.email" @blur="validateEmail()"
          @click="cleanMessage()">
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
      idUser: "",
      userInformation: {
        userName: "",
        password: "",
        email: "",
        answer: "",
        isLogged: false
      },
      message: ""
    };
  },

  methods: {
    register() {
      Service.register(this.userInformation).then(response => {
        if (response.data.isLogged) {
          this.idUser = response.data.id;
          localStorage.setItem("id", this.idUser);
          this.$store.dispatch("login");
          this.$store.dispatch("setId", this.idUser);
          localStorage.setItem("id", this.idUser);
          this.$router.push("/dictionaries/" + this.idUser);
        }
      });
    },

    showMessage(messageToShow) {
      this.message = messageToShow;
    },

    cleanMessage() {
      this.message = "";
    },

    validateUserField() {
      if (!this.userInformation.userName.match("^[a-zA-Z0-9]*$")) {
        this.showMessage("Please, no space allowed");
        this.userInformation.userName = "";
      }
    },

    validateEmail() {
      if (
        !this.userInformation.email.match(
          "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        )
      ) {
        this.showMessage("Please, insert a valide E-mail");
        this.userInformation.email = "";
      }
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


