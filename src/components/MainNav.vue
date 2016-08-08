<template>
	<nav id="main-nav" class="navbar navbar-inverse">
		<div class="container">
	    <div class="navbar-header">
	      <a class="navbar-brand" v-link="{ path: '/' }">Big League</a>
	    </div>
	    <div class="collapse navbar-collapse">
	     	<ul class="nav navbar-nav">
	        <li v-for="tab in tabsForUser">
						<a v-link="{ path: tab.path }">{{tab.text}}</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!authenticated">
            <a v-link="{ path: '/login' }">Sign in</a>
          </li>
          <li v-if="!authenticated">
            <a v-link="{ path: '/register' }">Register</a>
          </li>
          <li v-if="authenticated">
            <a @click="logout">Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

import {store} from '../store.js'
import auth from '../auth.js';

export default {
  data() {
    return {
      user: store.user,
      tabs: [
        { text: 'Guilds', auth: false, path: '/guilds' },
        { text: 'Campaign', auth: true, path: '/campaign' },
      ],
    };
  },
  computed: {
    authenticated: function() {
      return this.user.authenticated;
    },
    tabsForUser: function() {
      var authenticated = this.user.authenticated;
      return this.tabs.filter(function(tab) {
        return !tab.auth || authenticated;
      });
    }
  },
  methods: {
    onSetTab(tab) {
      this.tabs.forEach((item) => {
        item.active = false;
      });
      tab.active = true;
    },
    logout: function() {
      auth.logout();
      this.$route.router.go('/login');
    }
  },
};

</script>

<style scoped>

</style>