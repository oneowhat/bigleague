<template>
	<nav id="main-nav" class="navbar navbar-inverse">
		<div class="container">
	    <div class="navbar-header">
	      <router-link class="navbar-brand" to="/">Big League</router-link>
	    </div>
	    <div class="collapse navbar-collapse">
	     	<ul class="nav navbar-nav">
          <li class="dropdown" v-show="authenticated">
            <a href="javascript:;" class="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Guilds
            </a>
            <ul class="dropdown-menu">
              <li v-for="guild in guilds">
                <router-link :to="{ name: 'guild', params: { guild: guild.id }}">{{guild.name}}</router-link>
              </li>
            </ul>
          </li>
	        <li v-for="tab in tabsForUser">
						<router-link :to="{ path: tab.path }">{{tab.text}}</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!authenticated">
            <router-link to="/login">Sign in</router-link>
          </li>
          <li v-if="!authenticated">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="authenticated" class="dropdown">
            <a href="javascript:;" class="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{user.name}} <span class="caret"></span>
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
import data from '../data.js'
import auth from '../auth.js';

export default {
	name: 'main-nav',
  data() {
    return {
      user: store.user,
			guilds: [],
      tabs: [
        { text: 'Campaign', auth: true, path: '/campaigns' }
      ],
    };
  },
	mounted: function() {
		var vm = this;
		data.guilds.all((guilds) => {
				vm.guilds = guilds;
			}, (response) => {
				console.log(response);
			});
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
      this.$route.router.push('/login');
    }
  },
};

</script>

<style scoped>
</style>
