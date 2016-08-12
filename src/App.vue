<template>
  <div id="app">
    <main-nav></main-nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainNav from './components/MainNav';
import auth from './auth.js';
import {store} from './store.js';

export default {
  replace: false,
  components: {
    MainNav
  },
  ready() {
    auth.checkAuth();
  }
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
