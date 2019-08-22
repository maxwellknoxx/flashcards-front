<template>
  <div id="app">
    <div class="centerForm">
      <form @submit.prevent="checkInformation">
        <label>Email</label>
        <input type="text" required v-model="user.email" />

        <label>Username</label>
        <input type="text" required v-model="user.userName" />

        <p>What is your favorite food?</p>
        <label>Answer:</label>
        <input type="text" required v-model="user.answer" />

        <label>new password</label>
        <input type="password" required v-model="user.password" />

        <div>
          <button class="waves-effect waves-light btn-small">
            Recover password
            <i class="material-icons left">check</i>
          </button>
        </div>
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
        password: "",
        email: "",
        answer: ""
      }
    };
  },

  methods: {
    checkInformation() {
      Service.validations(this.user).then(response => {
        this.validateResponse(response);
      });
    },

    validateResponse(response) {
      if (response.data == true) {
        alert("Success");
        this.$router.push("/login");
      } else {
        alert("Please, veirify your information");
      }
    }
  }
};
</script>

<style>
.centerForm {
  margin: auto;
  width: 50%;
  border: 3px solid blue;
  padding: 10px;
}
</style>

