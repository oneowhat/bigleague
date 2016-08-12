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
          <li v-if="authenticated" class="dropdown">
            <a href="javascript:;" class="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{user.email}} <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a @click="logout" href="javascript:;">Sign out</a>
              </li>
            </ul>
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
        { text: 'Guilds', auth: true, path: '/guilds' },
        { text: 'Campaign', auth: true, path: '/campaigns' },
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
    logout: function() {
      auth.logout();
      this.$route.router.go('/login');
    }
  },
};

</script>

<style scoped>
</style>