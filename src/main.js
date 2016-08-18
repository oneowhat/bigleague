import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App';
import auth from './auth';
import {store} from './store'

Vue.use(VueResource);
Vue.use(VueRouter);

// vue resource interceptor to pass jwt if present
Vue.http.interceptors.push((request, next) => {
  request.headers['Authorization'] = auth.getAuthToken();
  next();
});

Vue.transition('expand', { });

var router = new VueRouter();

router.map({
  '/': {
    name: 'home',
    component: require('./components/Hello.vue')
  },
  '/guilds/:guild': {
    name: 'guild',
    component: require('./components/Guild.vue')
  },
  '/campaigns': {
    name: 'campaigns',
    component: require('./components/Campaigns.vue'),
    auth: true
  },
  '/campaigns/:campaign': {
    name: 'campaign',
    component: require('./components/Campaign.vue'),
    auth: true
  },
  '/login': {
    name: 'login',
    component: require('./components/Login.vue')
  },
  '/register': {
    name: 'register',
    component: require('./components/Register.vue')
  }
});

router.beforeEach(function(transition) {
  if(transition.to.auth && !store.user.authenticated) {
    transition.redirect('/login');
  } else {
    transition.next();
  }
});

router.start(App, 'body');
