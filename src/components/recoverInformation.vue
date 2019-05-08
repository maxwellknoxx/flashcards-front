<template>
  <div id="app">
    <div class="centerForm">
      <form @submit.prevent="checkInformation">
        <label>Email</label>
        <input type="text" required v-model="user.email">
        <p>What is your favorite food?</p>
        <label>Answer:</label>
        <input type="text" required v-model="user.answer">

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

import Service from '../services/userService';

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
        Service.getUserByEmail(this.user).then(response => {
            if(response.data.status) {
                this.$router.push("/newPassword/" + response.data.data.id);
            }
        }) 
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

