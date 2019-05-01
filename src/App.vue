<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Flash Cards</a>
        <ul ul id="nav-mobile" class="left hide-on-med-and-down">
          <li>
            <router-link to="/login">Login</router-link>
          </li>
          <li>
            <router-link to="/dictionaries">Dictionaries</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>
</style>
