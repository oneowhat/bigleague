import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App';
import auth from './auth';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.interceptors.push((request, next) => {
  request.headers['Authorization'] = auth.getAuthToken();
  next();
});

var router = new VueRouter();

router.map({
  '/': {
    component: require('./components/Hello.vue')
  },
  '/login': {
    component: require('./components/Login.vue')
  },
  '/register': {
    component: require('./components/Register.vue')
  }
});

router.start(App, 'body');
