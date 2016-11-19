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

var router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('./components/Hello.vue')
    },
    {
      path: '/guilds/:guild',
      name: 'guild',
      component: require('./components/Guild.vue')
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: require('./components/Campaigns.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/campaigns/:campaign',
      name: 'campaign',
      component: require('./components/Campaign.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/campaigns/:campaign/coaches/:coach',
      name: 'coach',
      component: require('./components/Coach.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/campaigns/:campaign/matches/:match',
      name: 'match',
      component: require('./components/Match.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: require('./components/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: require('./components/Login.vue')
    },
    {
      path: '/404',
      component: require('./components/NotFound.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta.auth && !store.user.authenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

auth.start();

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
