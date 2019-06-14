<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper" :key="$route.fullPath">
        <a href="#" class="brand-logo center">Flash Cards</a>
        <ul ul id="nav-mobile" class="left hide-on-med-and-down">
          <li v-if="isLogged">
            <router-link to="/logout">Logout</router-link>
          </li>
          <li v-else>
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="isLogged">
            <router-link :to=" '/dictionaries/' + this.$store.state.id ">dictionaries</router-link>
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
 
computed: {
    isLogged () {
      return this.$store.state.isLogged;
    }
  }

};
</script>

<style>
</style>
