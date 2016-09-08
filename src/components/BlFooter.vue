<template>
  <footer class="footer">
    <div class="container">
      <p class="text-muted">
        <div class="pull-left">
          <a href="http://steamforged.com/">Guild Ball</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="javascript:;">Contact</a>
        </div>
        <div class="pull-right">
          &copy; {{year}} - Brendan Kendrick
        </div>
      </p>
    </div>
  </footer>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      user: store.user,
      year: 0
    }
  },
  ready() {
    this.year = new Date().getFullYear();
  }
}
</script>

<style>

</style>
