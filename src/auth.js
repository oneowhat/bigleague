import {store} from './store';

function setAuthToken(user) {
  store.user.name = user.name;
  store.user.email = user.email;
  store.user.token = user.token;
  store.user.admin = user.admin;
  store.user.authenticated = true;
  
  localStorage.setItem('bluser', JSON.stringify(store.user));
}

exports.login = function(token, user) {
  user.token = token;
  setAuthToken(user);
};

exports.getAuthToken = function() {
  var user = localStorage.getItem('bluser');
  if(user) {
    user = JSON.parse(user);
    return 'Bearer ' + user.token;
  }
  return '';
};

exports.checkAuth = function() {
  var user = localStorage.getItem('bluser');
  if(user) {
    user = JSON.parse(user);
    setAuthToken(user);
  }
}

exports.logout = function() {
  localStorage.removeItem('bluser');
  store.user.name = '';
  store.user.token = null;
  store.user.email = '';
  store.user.admin = false;
  store.user.authenticated = false;
};