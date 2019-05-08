<template>
  <div id="app">
    <div class="container">
      <form @submit.prevent="updatePassword">
        <label>new password</label>
        <input type="text" required v-model="user.password">

        <button class="waves-effect waves-light btn-small">
          Change password
          <i class="material-icons left">check</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>

import Service from '../services/userService';

export default {
  data() {
    return {
      userId: this.$route.params.data,
      user: {
        id: "",
        password: ""
      }
    };
  },

created() {
    Service.ge
},

methods: {
    updatePassword() {
        this.user.id = this.userId;
            Service.updatePassword(this.user).then(response => {
            if(response.data.status) {
                alert(response.data.message)
                this.$router.push("/login");
            }
        })
    }
}

};
</script>


<style>
</style>
