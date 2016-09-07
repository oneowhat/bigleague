<template>
  <div id="app">
    <main-nav></main-nav>
    <div class="container main">
      <router-view></router-view>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import MainNav from './components/MainNav';
import Footer from './components/Footer';
import auth from './auth.js';
import {store} from './store.js';

export default {
  replace: false,
  components: {
    MainNav
  },
  ready() {
    auth.init();
  }
};
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  background: url(./assets/Steamforged.jpg) repeat-y center top;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  height: auto;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.main {
  margin-top: -20px;
  padding: 20px 40px 0 40px;
  height: 100%;
  background-color: white;
}

.logo {
  width: 100px;
  height: 100px
}

.container {
  width:1000px;
}

.expand-transition {
  transition: all .3s ease;
  padding: 10px;
}

.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}

.bl-modal-body {
  margin: 0 20px 0 20px;
}

</style>
