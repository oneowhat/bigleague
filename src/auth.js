import {store} from './store';

function setAuthToken(token, email, admin) {
  store.user.email = email;
  store.user.token = token;
  store.user.admin = admin;
  store.user.authenticated = true;
  
  localStorage.setItem('bluser', JSON.stringify(store.user));
}

exports.login = function(token, email, admin) {
  setAuthToken(token, email, admin);
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
    setAuthToken(user.token, user.email, user.admin);
  }
}

exports.logout = function() {
  localStorage.removeItem('bluser');
  store.user.token = null;
  store.user.email = '';
  store.user.admin = false;
  store.user.authenticated = false;
};