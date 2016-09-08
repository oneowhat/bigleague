<template>
  <div id="app">
    <main-nav></main-nav>
    <div class="container main">
      <router-view></router-view>
    </div>
    <bl-footer></bl-footer>
  </div>
</template>

<script>
import MainNav from './components/MainNav';
import BlFooter from './components/BlFooter.vue';
import auth from './auth.js';
import {store} from './store.js';

export default {
  replace: false,
  components: {
    MainNav,
    BlFooter
  },
  ready() {
    auth.init();
  }
};
</script>

<style>
html {
  min-height: 100%;
}

body {
  height: 100%;
  background: url(./assets/Steamforged.jpg) repeat-y center top;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  height: 100%;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.main {
  margin-top: -20px;
  padding: 20px 40px 100px 40px;
  background-color: white;
  height: 100%;
  min-height: 100%
}

.logo {
  width: 100px;
  height: 100px
}

.container {
  width:1000px;
}

.footer {
  height: 60px;
  background-color: #151515;
  width: 100%;
  bottom: 0;
  position: absolute;
  color: #848484 !important;
}

.footer a {
  color: #848484 !important;
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
