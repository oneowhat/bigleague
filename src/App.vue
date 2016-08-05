<template>
  <div id="app">
    <main-nav></main-nav>
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <login></login>
    <register></register>
  </div>
</template>

<script>
import Login from './components/Login';
import Register from './components/Register';
import Hello from './components/Hello';
import MainNav from './components/MainNav';

export default {
  components: {
    Login,
    Register,
    MainNav,
    Hello,
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
