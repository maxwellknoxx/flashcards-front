<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Flash Cards</a>
        <ul ul id="nav-mobile" class="left hide-on-med-and-down">
          <li v-if="this.isLogged">
            <router-link to="/logout">Logout</router-link>
          </li>
          <li v-else>
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="this.isLogged">
            <router-link :to=" '/dictionaries/' + id ">dictionaries</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <hr>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  mounted() {
    this.id = localStorage.getItem("id");
    if (this.id != null) {
      console.log("logado id " + this.id);
      this.isLogged = true;
      this.$router.push("/dictionaries/" + this.id);
    } else {
      this.isLogged = false;
    }
  },

  data() {
    return {
      id: "",
      isLogged: ""
    };
  }
};
</script>

<style>
</style>
