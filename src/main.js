import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App';
import auth from './auth';

Vue.use(VueResource);
Vue.use(VueRouter);

// vue resource interceptor to pass jwt if present
Vue.http.interceptors.push((request, next) => {
  request.headers['Authorization'] = auth.getAuthToken();
  next();
});

Vue.transition('expand', {
  
});

var router = new VueRouter();

router.map({
  '/': {
    name: 'home',
    component: require('./components/Hello.vue')
  },
  '/guilds': {
    name: 'guilds',
    component: require('./components/Guilds.vue')
  },
  '/guilds/:guild': {
    name: 'guild',
    component: require('./components/Guild.vue')
  },
  '/campaigns': {
    name: 'campaigns',
    component: require('./components/Campaigns.vue')
  },
  '/campaigns/:campaign': {
    name: 'campaign',
    component: require('./components/Campaign.vue')
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

router.start(App, 'body');
