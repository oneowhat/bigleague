<template>
  <div id="app">
    <main-nav></main-nav>
    <img class="logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import MainNav from './components/MainNav';

export default {
  replace: false,
  components: {
    MainNav
  },
};
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
