import {store} from './store';

exports.setAuthToken = function(token) {
  localStorage.setItem('jwt-token', token);
  store.user.token = token;
  store.user.authenticated = true;
}

exports.getAuthToken = function() {
  var token = localStorage.getItem('jwt-token');
  return 'Bearer ' + token;
};

exports.logout = function() {
  localStorage.removeItem('jwt-token');
  store.user.token = null;
  store.user.authenticated = false;
};