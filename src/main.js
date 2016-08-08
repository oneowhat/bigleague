import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App';

Vue.use(VueResource);
Vue.use(VueRouter);

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
